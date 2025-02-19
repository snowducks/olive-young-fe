import React from "react";
import { useNavigate } from "react-router-dom"; // ★ 라우터 훅
import "./App.css";

function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {

    fetch('/tickets/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timestamp: new Date(), eventId: 1}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 오류 발생');
        }
        return response.text(); // 또는 JSON 데이터가 있다면 .json()
      })
      .then((data) => {
        console.group('서버 응답: ', data);
        navigate("/waiting");
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