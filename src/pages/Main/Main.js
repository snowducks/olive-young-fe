import React from "react";
import { useNavigate } from "react-router-dom"; 
import { useCookies } from "react-cookie";
import "./Main.css";
import PhoneFrame from "../../components/organisms/PhoneFrame";

function Main() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["uuid"]);

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
        credentials: "include", // 쿠키를 포함하여 요청
      });

      if (response.ok) {
        if (cookies.uuid) {
          console.log("uuid cookie : ", cookies.uuid);
          navigate("/waiting");
        }
        
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
      {/* 상단 섹션: olive_youg_Top 이미지를 보여줄 영역 */}
      <div className="top-section">
        <img
          src="/images/oliveTopBar.png"
          alt="Top Banner"
          className="top-image"
        />
      </div>

      {/* 메인 섹션: olivePopup 이미지를 꽉 채우고 버튼 올리기 */}
      <div className="center-content">
        <img 
          src="/images/olivePopup.png"
          alt="Phone content"
          className="phone-image"
        />
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
