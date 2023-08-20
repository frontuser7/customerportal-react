import React, { useState, useEffect } from "react";
import "./ShowItems.css";
import MyButton from "../MyButton/MyButton";
import { useSelector } from "react-redux";

function ShowItems({
  buttonName,
  backgroundColor,
  color,
  handleClick,
  currency,
}) {
  const cartDetails = useSelector((state) => state.cartInfo);

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow">
      <div>
        <div>
          <span className="fw-bold">{cartDetails.itemCount}</span>{" "}
          {cartDetails.itemCount > 1 ? "Items" : "Item"}
        </div>
        <div>
          <span className="fw-bold">
            {currency} {cartDetails.totalPrice}
          </span>{" "}
          Plus Taxes
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
