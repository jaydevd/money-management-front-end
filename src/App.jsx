// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import LogIn from "./pages/auth/LogIn";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyLink from "./pages/auth/VerifyLink";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/auth" >
            <Route path="/auth/" element={<NotFound />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password/:id/:token" element={
              <VerifyLink>
                <ResetPassword />
              </VerifyLink>
            } />
            <Route path="/auth/login" element={<LogIn />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;