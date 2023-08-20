import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MyButton from "../../MyButton/MyButton";

function CustomModal({ showModal, setShowModal, itemdata }) {
  const handleClose = () => {
    setShowModal(!showModal);
  };

  const [selectedExtraItem, setSelectedExtraItem] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(
    itemdata.item_total_price
  );

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  // get data from store
  const restoSessionDetails = useSelector((state) => state.restoSession);
  const restoDetails = useSelector((state) => state.restoData);

  // destructure the data
  const { session_uuid } = restoSessionDetails;
  const { currency } = restoDetails;

  // handle extra items function
  const handleSelect = (e) => {
    const { name, checked, value } = e.target;
    setSelectedExtraItem((prevState) => ({ ...prevState, [name]: checked }));
    if (checked) {
      setTotalCartPrice(totalCartPrice + Number(value));
    } else {
      if (totalCartPrice > itemdata.item_total_price) {
        setTotalCartPrice(totalCartPrice - Number(value));
      }
    }
  };

  console.log(itemdata);

  const handleUpdate = () => {};
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div className="fw-bold">{itemdata.item_name}</div>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="fw-bold mb-2">Update your Addon's</div>
          {itemdata.session_extra_item.map((item) => (
            <div key={item.id} className="row align-items-center mb-1">
              <div className="col-6">{item.extra_item}</div>
              <div className="col-4">
                <div className="d-flex gap-1 justify-content-start price">
                  <div>{currency}</div>
                  <div className="fs-5 fw-bold">{item.price}</div>
                </div>
              </div>
              <div className="col-2">
                <input
                  type="checkbox"
                  className="tnc-checkbox"
                  value={item.price}
                  name={item.id}
                  onChange={(e) => {
                    handleSelect(e);
                  }}
                />
              </div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between mt-2 align-items-center">
            <div>
              <div>Total Price</div>
              <div>{totalCartPrice}</div>
            </div>
            <div>
              <MyButton
                name={"Update Meal"}
                bgColor={"#44CE42"}
                color={"#fff"}
                padding={"5px 15px"}
                handleBtnClick={handleUpdate}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CustomModal;
