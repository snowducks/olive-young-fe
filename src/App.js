import React from "react";
import { useNavigate } from "react-router-dom"; // ★ 라우터 훅
import "./App.css";

function App() {
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`${API_URL}/tickets/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketType: "standard" }), // 예시 데이터
        credentials: "include", // 쿠키를 포함하여 요청
      });

      if (response.ok) {
        navigate("/waiting");
      } else {
        console.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="phone-container">
      <div className="phone-frame">
        <div className="notch"></div>
        <div className="phone-screen">
          <div className="logo-container">
            <img
              src="/images/olive_young_logo.png"
              className="phone-logo"
              alt="Olive Young Logo"
            />
          </div>
          <div className="center-content">
            <button className="reserve-btn noto-sans-kr" onClick={handleButtonClick}>
              반짝 예매
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;