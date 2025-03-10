// src/WaitingScreen.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./WaitingScreen.css";
import PhoneFrame from "../../components/organisms/PhoneFrame";

function WaitingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [waitingCount, setWaitingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const { uuid } = location.state || {};

  const ws = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // const wsUrl = process.env.REACT_APP_WS_URL;
    ws.current = new WebSocket(`/ws/websocket/queue`);

    ws.current.onopen = () => {
      console.log("WebSocket 연결됨");

      // 쿠키에 담긴 uuid 전송
      console.log("uuid : ", uuid);
      if (uuid) {
        intervalRef.current = setInterval(() => {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(uuid);
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
          navigate("/time-selection", { state: { uuid } });
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
  }, [uuid, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <PhoneFrame>
      {/* 가운데 문구 */}
      <div className="center-content">
        {isLoading ? (
          <div className="noto-sans-kr loading-text">로딩중...</div>
        ) : (
          <div className="noto-sans-kr waiting-text">
            {waitingCount}명이 대기중입니다.
          </div>
        )}
        {/* 숨겨진 요소로 canEnter 값을 노출 */}
        <div id="canEnterIndicator" style={{ display: "none" }}>
          {window.canEnter ? "true" : "false"}
        </div>
      </div>
      <button className="back-btn noto-sans-kr" onClick={handleGoBack}>
        뒤로가기
      </button>
    </PhoneFrame>
  );
}

export default WaitingScreen;
