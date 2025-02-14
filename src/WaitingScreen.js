// src/WaitingScreen.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function WaitingScreen() {
  const navigate = useNavigate();
  const [waitingCount, setWaitingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 백엔드 연동 대신 데모용 타이머
    setTimeout(() => {
      setWaitingCount(12345);
      setIsLoading(false);
    }, 1500);
  }, []);

  // 로딩이 끝난 후, 5초 뒤에 자동으로 세 번째 화면으로 이동
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        navigate("/time-selection");
      }, 2000);

      // 언마운트 시 타이머 해제
      return () => clearTimeout(timer);
    }
  }, [isLoading, navigate]);


  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="phone-container">
      <div className="phone-frame">
        <div className="notch"></div>
        <div className="phone-screen">
          {/* 로고 (상단) */}
          <img
            src="/images/olive_young_logo.png"
            className="phone-logo"
            alt="Olive Young Logo"
          />
          {/* 가운데 문구 */}
          <div className="center-content">
            {isLoading ? (
              <div className="noto-sans-kr loading-text">로딩중...</div>
            ) : (
              <div className="noto-sans-kr waiting-text">
                {waitingCount}명이 대기중입니다.
              </div>
            )}
          </div>
          {/* 뒤로가기 버튼 (작게) */}
          <button className="back-btn noto-sans-kr" onClick={handleGoBack}>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default WaitingScreen;
