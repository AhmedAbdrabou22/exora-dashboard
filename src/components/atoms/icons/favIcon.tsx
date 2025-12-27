import React from "react";
import fav from "../../../assets/global/favicon.png";

function FavIcon() {
  return (
    <div className="logo-in-top">
      <img alt="Logo" src={fav} style={{ height: "30px", width: "30px" }} />
    </div>
  );
}

export default FavIcon;
