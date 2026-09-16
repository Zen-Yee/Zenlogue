import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import InputText from "../../components/ui/InputText/InputText";
import RoundedButton from "../../components/ui/RoundedButton/RoundedButton";

import "./Authpage.css";

function Authpage() {
  return (
    <div className="auth-page">
      <div className="auth-background">
        <img src="https://picsum.photos/500" alt="Random placeholder" />
      </div>
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="form-tabs">
            <NavLink
              to="/auth/signin"
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Sign In
            </NavLink>
            <NavLink
              to="/auth/register"
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              Register
            </NavLink>
          </div>
          <div className="form-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authpage;
