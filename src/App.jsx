// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/auth/LogIn";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;