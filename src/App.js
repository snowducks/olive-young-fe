import React from "react";
import { useNavigate } from "react-router-dom"; // ★ 라우터 훅
import { useCookies } from "react-cookie";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['uuid']);

  const API_URL = process.env.REACT_APP_API_URL;

  const date = new Date();
  // 연도, 월, 일, 시, 분, 초를 각각 2자리로 맞추어 문자열로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  // 원하는 형식 (YYYY-MM-DDTHH:mm:ss)으로 조합
  const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`${API_URL}/tickets/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timestamp: formattedDate, eventId: 1 }), // 예시 데이터
        credentials: "include", // 쿠키를 포함하여 요청
      });

      if (response.ok) {
        console.log("uuid cookie : ", cookies.uuid);
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