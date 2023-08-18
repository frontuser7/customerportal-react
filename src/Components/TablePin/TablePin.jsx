import React from "react";
import "./TablePin.css";

function TablePin({ session_pin }) {
  return (
    <div>
      <div className="d-flex mt-2 justify-content-center gap-1">
        <div className="pin rounded-start-pill fw-bold">Pin</div>
        <div className="pinNumber rounded-end-pill">{session_pin}</div>
      </div>
    </div>
  );
}

export default TablePin;
