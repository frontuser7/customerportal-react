import React from "react";
import "./ViewItemModal.css";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from "../../../Config/Config";
import defaultFoodImg from "../../../Assets/SVG/dish4.svg";

function ViewItemModal({ show, setShow, itemData }) {
  const handleClose = () => setShow(false);

  const {
    id,
    item_logo,
    long_desc,
    name,
    price,
    category,
    subcategory,
    extra_item_item,
  } = itemData;

  const foodLogo = BASE_URL + item_logo;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div id={id} className="row">
          <div className="col-12">
            <div
              style={{
                backgroundImage: `url(${
                  item_logo ? foodLogo : defaultFoodImg
                })`,
              }}
              className="itemImg w-100 rounded-2"
            ></div>
          </div>
          <div className="col-12">
            <h5 className="fw-bold mt-3">{name}</h5>
            {long_desc && <p className="item-description">{long_desc}</p>}
            <div className="col-12 Itemtype">
              <div className="d-flex gap-2">
                <div className="fw-bold">Category :</div>
                <div>{category.name}</div>
              </div>
            </div>
            <div className="col-12 Itemtype mb-2">
              <div className="d-flex gap-2">
                <div className="fw-bold">Sub Category :</div>
                <div>{subcategory.name}</div>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div className="fw-bold">Price : </div>
              <div className="d-flex gap-1 justify-content-start price">
                <div>₹</div>
                <div className="fs-3 fw-bold">{price}</div>
              </div>
            </div>
            {/* Addons */}
            {extra_item_item.length ? (
              <>
                <h6 className="fw-bold mt-3">Add-Ons</h6>
                {extra_item_item.map((item) => (
                  <div key={item.id} className="row mb-1">
                    <div className="col-8">{item.extra_item}</div>
                    <div className="col-4">
                      <button className="addBtn rounded-pill">Add</button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div>Total Price : </div>
                <div className="d-flex gap-1 justify-content-start price">
                  <div>₹</div>
                  <div className="fs-3 fw-bold">120</div>
                </div>
              </div>
              <div>
                <button className="addBtn rounded-pill">Add Meal</button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ViewItemModal;
