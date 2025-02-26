// src/TimeSelectionScreen.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TimeSelectionScreen.css";
import PhoneFrame from "../../components/organisms/PhoneFrame";

function TimeSelectionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTime, setSelectedTime] = useState(null);
  const [availability, setAvailability] = useState({});

  const ws = useRef(null);
  const intervalRef = useRef(null); // interval 관리를 위한 ref 추가
  // const API_URL = process.env.REACT_APP_API_URL;

  const times = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];
  const { uuid, timestamp } = location.state || {};

  // WebSocket 연결 설정
  useEffect(() => {
    // const wsUrl = process.env.REACT_APP_WS_URL;
    ws.current = new WebSocket(`ws/websocket/tickets`);

    ws.current.onopen = () => {
      console.log("WebSocket 연결됨");
      // 최초 연결 시 즉시 요청
      // ws.current.send("ALL_TIMESLOTS");

      // 주기적으로 
      intervalRef.current = setInterval(() => {
        if (ws.current.readyState === WebSocket.OPEN) { 
          ws.current.send("ALL_TIMESLOTS");
        }
      }, 1000); // 1초 간격
    };

    ws.current.onmessage = (event) => {
      console.log("WebSocket 메시지 수신:", event.data);
      
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "all_ticket_status" && msg.data) {
          // 서버에서 전달한 잔여 티켓 정보를 상태에 저장
          setAvailability(msg.data);
        }
      } catch (error) {
        console.error("메시지 파싱 오류:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket 에러:", error);
    };

    return () => {
      // interval 해제
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // WebSocket 닫기
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };

  }, []);

  const handleTimeClick = (time) => {
    // 해당 슬롯의 잔여 티켓이 없으면 클릭 무시
    if (availability[time] === false) {
      return;
    }

    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (selectedTime === null) {
      alert("시간을 선택해주세요!");
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (ws.current) {
      ws.current.close();
      console.log("WebSocket 종료됨");
    }

    fetch(`/api/tickets/booking`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        timestamp: timestamp, 
        eventId: 1, 
        timeSlot: selectedTime,
        uuid: uuid,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답이 올바르지 않습니다.');
        }
        return response.text();
      })
      .then((data) => {
        console.group('서버 응답: ', data);
        console.log(selectedTime, typeof(selectedTime));
        navigate("/receipt");
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  };

  return (
    <PhoneFrame>
      {/* 중앙 영역: 시간 선택 버튼 + 예매 완료 버튼 */}
      <div className="center-content noto-sans-kr">
        {/* 시간 버튼 목록 */}
        <div className="scrollable-grid" >
          {times.map((hour) => (
            <button
            key={hour}
            className={`time-button ${selectedTime === hour ? "selected" : ""}`}
            onClick={() => handleTimeClick(hour)}
            disabled={availability[hour] === 0}
          >
              {hour}
            </button>
          ))}
        </div>

        {/* 예매 완료 버튼 */}
        <button
          className="reserv-btn"
          style={{ marginTop: "20px" }}
          onClick={handleBooking}
        >
          예매 완료
        </button>
      </div>
    </PhoneFrame>
  );
}

export default TimeSelectionScreen;
