import React from "react";
import "./ShowItems.css";
import MyButton from "../MyButton/MyButton";

function ShowItems({ buttonName, backgroundColor, color, handleClick }) {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow">
      <div>
        <div>
          <span className="fw-bold">2</span> Items
        </div>
        <div>
          <span className="fw-bold">₹ 200</span> Plus Taxes
        </div>
      </div>
      <div>
        <MyButton
          name={buttonName}
          bgColor={backgroundColor}
          color={color}
          handleBtnClick={handleClick}
        />
      </div>
    </div>
  );
}

export default ShowItems;
