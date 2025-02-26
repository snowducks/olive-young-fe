import React from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import PhoneFrame from "../../components/organisms/PhoneFrame";

function Main() {
  const navigate = useNavigate();

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
  
  const handleButtonClick = async () => {
    try {
      const response = await fetch(`/api/tickets/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timestamp: formattedDate, eventId: 1 }), 
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const uuid = data.uuid;

        if (uuid) {
          console.log("received uuid : ", uuid);
          navigate("/waiting", { state: { uuid, formattedDate } });
        } else {
          console.error("UUID가 API 응답에 없습니다.");
        }
      } else {
        console.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <PhoneFrame>
      <div className="top-section">
        <img
          src="/images/oliveTopBar.png"
          alt="Top Banner"
          className="top-image"
        />
      </div>

      <div className="center-content">
        <img 
          src="/images/olivePopup.png"
          alt="Phone content"
          className="phone-image"
        />
        <button
          className="reserve-start-btn noto-sans-kr"
          onClick={handleButtonClick}
        >
          반짝 예매
        </button>
      </div>
    </PhoneFrame>
  );
}

export default Main;