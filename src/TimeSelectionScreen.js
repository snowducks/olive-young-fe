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

  const handleComplete = () => {
    if (selectedTime === null) {
      alert("시간을 선택해주세요!");
      return;
    }
    // 선택한 시간이 있다면, 네 번째 화면으로 이동
    navigate("/receipt");
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
                  style={{
                    padding: "8px 16px",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    border: selectedTime === hour ? "2px solid #333" : "1px solid #ccc",
                    backgroundColor: "#fff",
                    cursor: "pointer"
                  }}
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
              onClick={handleComplete}
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
