import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set Login as the default page */}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path='/forgot-Password' element={<ForgotPassword/>}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;