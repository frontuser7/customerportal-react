import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function KYCModal({
  showKYCModal,
  setShowKYCModal,
  kycStatus,
  userData,
  setUserData,
  placeOrder,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <Modal
      show={showKYCModal}
      onHide={() => {
        setShowKYCModal(!showKYCModal);
      }}
      centered
    >
      <Modal.Body>
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          <div className="fw-bold">
            Please fill up the details to place order
          </div>
          {kycStatus.personal_name && (
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="personal_name"
              value={userData.personal_name}
              onChange={(e) => handleChange(e)}
            />
          )}
          {kycStatus.personal_email && (
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              name="personal_email"
              value={userData.personal_email}
              onChange={(e) => handleChange(e)}
            />
          )}
          {kycStatus.personal_phone_no && (
            <input
              type="number"
              className="form-control"
              placeholder="Mobile No."
              name="personal_phone_no"
              value={userData.personal_phone_no}
              onChange={(e) => handleChange(e)}
            />
          )}
          <Button variant="success" onClick={placeOrder}>
            Place Order
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default KYCModal;
