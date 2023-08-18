import React from "react";
import "./FilterBtn.css";
import CloseBtn from "../CloseBtn/CloseBtn";
import { MdFastfood } from "react-icons/md";
import { PiBowlFoodFill } from "react-icons/pi";

function FilterBtn({ heading }) {
  let selectedItem = "Veg";
  const itemArr = ["Veg", "Non Veg", "Rice", "Pizza", "Burger"];
  return (
    <div className="mx-2 mt-3">
      <h6 className="d-flex gap-2 fw-bold">
        {heading === "Category" ? <MdFastfood /> : <PiBowlFoodFill />}
        {heading}
      </h6>
      <div className="d-flex gap-2 overflow-auto w-100 category-container">
        {itemArr &&
          itemArr.map((item, index) => (
            <CloseBtn
              key={index}
              name={item}
              bgColor={heading === "Category" ? "#e7fde7" : "#fff6e4"}
              bgSelectedColor={heading === "Category" ? "#44CE42" : "#FDC55E"}
              color={heading === "Category" ? "#44CE42" : "#FDC55E"}
              selectedColor={"#fff"}
              selectedItem={selectedItem}
            />
          ))}
      </div>
    </div>
  );
}

export default FilterBtn;
