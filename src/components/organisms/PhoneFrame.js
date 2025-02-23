import React from "react";
import "./PhoneFrame.css";

function PhoneFrame({ children }) {
  return (
    <div className="phone-container">
      <div className="phone-frame">
        <div className="notch"></div>
        <div className="phone-screen">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PhoneFrame;
