import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useCookies } from "react-cookie";
import "./Main.css";
import PhoneFrame from "../../components/organisms/PhoneFrame";

function Main() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["uuid"]);
  const [hasNavigated, setHasNavigated] = useState(false);

  // const API_URL = process.env.REACT_APP_API_URL;

  // 날짜/시간 포맷팅
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  
  // 쿠키가 업데이트되었을 때 navigate 호출
  useEffect(() => {
    if (cookies.uuid && !hasNavigated) {
      setHasNavigated(true);
      navigate("/waiting");
    }
  }, [cookies, hasNavigated, navigate]);

  const handleButtonClick = async () => {
    try {
      const response = await fetch(`/api/tickets/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timestamp: formattedDate, eventId: 1 }), 
        credentials: "include", // 쿠키를 포함하여 요청
      });

      if (response.ok) {
        console.log("uuid cookie : ", cookies.uuid);
        // 쿠키가 설정되면 useEffect에서 navigate가 호출됩니다.
      } else {
        console.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <PhoneFrame>
      <div className="center-content">
        <button
          className="reserve-btn noto-sans-kr"
          onClick={handleButtonClick}
        >
          반짝 예매
        </button>
      </div>
    </PhoneFrame>
  );
}

export default Main;
