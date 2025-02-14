// src/Receipt.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Receipt() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
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
          {/* 중앙 영역 */}
          <div className="center-content noto-sans-kr">
            <h2>예매가 완료되었습니다!</h2>
          </div>
          <button
            className="reserve-btn"
            style={{ marginTop: "20px" }}
            onClick={handleGoHome}
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
