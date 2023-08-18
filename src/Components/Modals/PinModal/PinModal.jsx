import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function PinModal({
  showPinModal,
  setShowPinModal,
  checkPin,
  setCheckPin,
  startPinSession,
  startNewSession,
  getMenu,
}) {
  // get data from redux store
  const restoSessionDetails = useSelector((state) => state.restoSession);

  // destructure data
  const { session_uuid } = restoSessionDetails;

  const handleNewSession = () => {
    if (!session_uuid) {
      startNewSession();
      if (session_uuid) {
        getMenu();
      }
    } else {
      getMenu();
    }
    setCheckPin("");
    setShowPinModal(false);
  };

  return (
    <Modal
      show={showPinModal}
      onHide={() => {
        setShowPinModal(!showPinModal);
      }}
      centered
    >
      <Modal.Body>
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          <div className="fw-bold">Join with pin or start new session</div>
          <input
            value={checkPin}
            onChange={(e) => setCheckPin(e.target.value)}
            type="number"
            className="form-control"
          />
          <button
            className="btn btn-success btn-sm mt-2"
            onClick={() => {
              startPinSession();
            }}
          >
            Join
          </button>
          <div className="description">- OR -</div>
          <Button variant="warning" onClick={handleNewSession}>
            Start New Session
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PinModal;
