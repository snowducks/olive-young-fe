// src/WaitingScreen.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../Main/Main.css";
import "./WaitingScreen.css";

function WaitingScreen() {
  const navigate = useNavigate();
  const [waitingCount, setWaitingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(['uuid']); // 쿠키 훅 사용

  
  const ws = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const wsUrl = process.env.REACT_APP_WS_URL;
    ws.current = new WebSocket(`${wsUrl}/websocket/queue`);

    ws.current.onopen = () => {
      console.log("WebSocket 연결됨");
      // 쿠키에 담긴 uuid 전송
      console.log("uuid cookie : ", cookies.uuid);
      if (cookies.uuid) {
        intervalRef.current = setInterval(() => {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(cookies.uuid);
        }
      }, 1000); // 1초 간격
      } else {
        console.error("쿠키에 uuid가 존재하지 않습니다.");
      }
    };

    ws.current.onmessage = (event) => {
      console.log("서버로부터 메시지 수신:", event.data);
      try {
        const data = JSON.parse(event.data);
        // 입장 가능 여부가 true이면 해당 경로로 이동
        if (data.canEnter === true) {
          clearInterval(intervalRef.current);
          ws.current.close();
          navigate("/time-selection");
        }
        // waitingOrder 값 업데이트
        if (data.waitingOrder !== undefined) {
          setWaitingCount(data.waitingOrder);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("메시지 파싱 오류:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket 에러:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket 연결 종료");
    };


    // ★ 중요: cleanup 함수
    return () => {
      // interval 정리
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // WebSocket 정리
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.close();
        console.log("WebSocket 연결 종료");
      }
    };
  }, [cookies.uuid, navigate]);

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
