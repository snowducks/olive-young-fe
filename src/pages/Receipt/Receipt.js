// src/Receipt.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Main/Main.css";
import PhoneFrame from "../../components/organisms/PhoneFrame";

function Receipt() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <PhoneFrame>
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
    </PhoneFrame>

  );
}

export default Receipt;
