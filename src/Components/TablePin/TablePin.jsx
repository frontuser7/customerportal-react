import React from "react";
import "./TablePin.css";

function TablePin({ name, value }) {
  return (
    <div>
      <div className="d-flex mt-2 justify-content-center gap-1">
        <div className="pin rounded-start-pill fw-bold">{name}</div>
        <div className="pinNumber rounded-end-pill">{value}</div>
      </div>
    </div>
  );
}

export default TablePin;
