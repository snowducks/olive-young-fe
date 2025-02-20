// src/TimeSelectionScreen.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function TimeSelectionScreen() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const [availability, setAvailability] = useState({});

  const ws = useRef(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const times = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  // WebSocket 연결 설정
  useEffect(() => {
    const wsUrl = process.env.REACT_APP_WS_URL;
    // WebSocket 엔드포인트 URL (환경에 따라 수정)
    const ws = new WebSocket(`${wsUrl}/websocket/tickets`);

    ws.onopen = () => {
      console.log("WebSocket 연결됨");
      // 연결 후 전체 타임슬롯 정보 요청
      ws.send("ALL_TIMESLOTS");
    };

    ws.onmessage = (event) => {
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

    ws.onerror = (error) => {
      console.error("WebSocket 에러:", error);
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

    if (ws.current) {
      ws.current.close();
      console.log("WebSocket 종료됨");
    }

    fetch(`${API_URL}/tickets/booking`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        time: new Date(), 
        eventId: 1, 
        timeSlot: selectedTime
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
        navigate("/receipt");
      })
      .catch((error) => {
        console.error('에러 발생:', error);
      });
  };

  return (
    <div className="phone-container">
      <div className="phone-frame">
        <div className="notch"></div>
        <div className="phone-screen">
          {/* 로고 영역 */}
          <div className="logo-container">
            <img
              src="/images/olive_young_logo.png"
              className="phone-logo"
              alt="Olive Young Logo"
            />
          </div>

          {/* 중앙 영역: 시간 선택 버튼 + 예매 완료 버튼 */}
          <div className="center-content noto-sans-kr">
            {/* 시간 버튼 목록 */}
            <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }} >
              {times.map((hour) => (
                <button
                key={hour}
                className={`time-button ${selectedTime === hour ? "selected" : ""}`}
                onClick={() => handleTimeClick(hour)}
              >
                  {hour}
                </button>
              ))}
            </div>

            {/* 예매 완료 버튼 */}
            <button
              className="reserve-btn"
              style={{ marginTop: "20px" }}
              onClick={handleBooking}
            >
              예매 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeSelectionScreen;
