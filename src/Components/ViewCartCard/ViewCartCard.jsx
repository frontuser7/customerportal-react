import React, { useState } from "react";
import "./ViewCartCard.css";
import ViewItemModal from "../Modals/ViewItemModal/ViewItemModal";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";

function ViewCartCard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="position-relative menuCard border rounded-4 p-2 m-2 shadow-sm">
      <div className="row">
        <div className="col-4">
          <div className="foodImg rounded-4 w-100 h-100"></div>
        </div>
        <div className="col-8">
          <h6 className="fw-bold text-start my-2">Paneer</h6>
          <div className="addons-info mb-2 d-flex gap-2 flex-wrap">
            <div className="fw-bold">Addon's : </div>
            <div>Water, Ice, Pepsi</div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-1 justify-content-center price">
              <div>₹</div>
              <h6 className="fs-4">120</h6>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <MdRemoveCircle size={"25px"} color="#FDC55E" />
              <div className="fw-bold">2</div>
              <MdAddCircle size={"25px"} color="#FDC55E" />
            </div>
          </div>
        </div>
      </div>
      <ViewItemModal show={showModal} setShow={setShowModal} />
    </div>
  );
}

export default ViewCartCard;
