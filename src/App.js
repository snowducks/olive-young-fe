import React from "react";
import "./App.css";

function App() {
  const handleClick = () => {
    alert("반짝 반짝");
  };

  return (
    <div className="phone-container">
      <div className="phone-frame">
        <div className="notch"></div>
        <div className="phone-screen">
          {/* 로고 이미지: public 경로 참조 시 /images/... 로 시작 */}
          <img
            src="/images/olive_young_logo.png"
            className="phone-logo"
            alt="Olive Young Logo"
          />
          <button className="reserve-btn noto-sans-kr" onClick={handleClick}>
            반짝 예매
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
