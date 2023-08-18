import React from "react";
import "./MyButton.css";

function MyButton({ name, color, bgColor, handleBtnClick, padding }) {
  return (
    <div
      onClick={() => {
        handleBtnClick();
      }}
      style={{
        backgroundColor: `${bgColor}`,
        color: `${color}`,
        padding: padding ? padding : "8px 20px",
      }}
      className="MyButton rounded-3"
    >
      {name}
    </div>
  );
}

export default MyButton;
