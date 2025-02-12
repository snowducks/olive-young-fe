// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";             // 첫 번째 화면
import WaitingScreen from "./WaitingScreen"; // 두 번째 화면

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/waiting" element={<WaitingScreen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
