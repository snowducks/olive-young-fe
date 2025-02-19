// src/TimeSelectionScreen.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function TimeSelectionScreen() {
  const navigate = useNavigate();
  // 시간 선택 상태
  const [selectedTime, setSelectedTime] = useState(null);

  // 10시부터 15시까지 (6개)
  const times = [10, 11, 12, 13, 14, 15];

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {

    if (selectedTime === null) {
      alert("시간을 선택해주세요!");
      return;
    }

    fetch('/tickets/booking', {
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
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {times.map((hour) => (
                <button
                key={hour}
                className={`time-button ${selectedTime === hour ? "selected" : ""}`}
                onClick={() => handleTimeClick(hour)}
              >
                  {hour}시
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
