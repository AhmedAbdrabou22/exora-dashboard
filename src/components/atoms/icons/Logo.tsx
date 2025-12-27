import React from "react";
import logo from "../../../assets/global/logo_ar.webp";

function Logo() {
  return (
    <div className="logo-in-top">
      <img alt="Logo" src={logo} style={{ height: "30px", width: "30px" }} />
    </div>
  );
}

export default Logo;
