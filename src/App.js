import React from "react";
import { useNavigate } from "react-router-dom"; // ★ 라우터 훅
import "./App.css";

function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/waiting");
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