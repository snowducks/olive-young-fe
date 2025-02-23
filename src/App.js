// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main/Main";                     // 첫 번째 화면(이전 App.js 역할)
import WaitingScreen from "./pages/Waiting/WaitingScreen";   // 두 번째 화면
import TimeSelectionScreen from "./pages/TimeSelection/TimeSelectionScreen"; // 세 번째 화면
import Receipt from "./pages/Receipt/Receipt";               // 네 번째 화면

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/waiting" element={<WaitingScreen />} />
        <Route path="/time-selection" element={<TimeSelectionScreen />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
