import React, { useEffect, useState } from "react";
import "./CloseBtn.css";
import { CgCloseO } from "react-icons/cg";

function CloseBtn({
  name,
  padding,
  bgColor,
  bgSelectedColor,
  color,
  selectedColor,
  selectedItem,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedItem === name) {
      setShow(!show);
    }
  }, [selectedItem]);
  return (
    <div
      className="d-flex gap-2 rounded-3 CloseBtn"
      style={{
        padding: padding ? padding : "5px 15px",
        backgroundColor: selectedItem === name ? bgSelectedColor : bgColor,
        color: selectedItem === name ? selectedColor : color,
      }}
    >
      <div>{name}</div>
      {show && (
        <div>
          <CgCloseO />
        </div>
      )}
    </div>
  );
}

export default CloseBtn;
