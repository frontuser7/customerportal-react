import React, { useEffect, useState } from "react";
import "./MenuCard.css";
import MyButton from "../MyButton/MyButton";
import ViewItemModal from "../Modals/ViewItemModal/ViewItemModal";
import { BiSolidInfoCircle } from "react-icons/bi";
import defaultFoodImg from "../../Assets/SVG/dish4.svg";
import { BASE_URL } from "../../Config/Config";
import { MdRemoveCircle, MdAddCircle } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateCount } from "../../Store/restoMenuListSlice";

function MenuCard({ itemData }) {
  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const dispatch = useDispatch();

  const { id, item_logo, long_desc, name, price, count } = itemData;

  const foodLogo = BASE_URL + item_logo;

  // handle Add btn
  const handleAdd = () => {
    setShowAdd(!showAdd);
    dispatch(
      updateCount({
        id: id,
        count: count + 1,
      })
    );
  };

  // handle add item
  const handleAddItem = () => {
    dispatch(
      updateCount({
        id: id,
        count: count + 1,
      })
    );
  };

  // handle remove item
  const handleRemoveItem = () => {
    dispatch(
      updateCount({
        id: id,
        count: count - 1,
      })
    );
    if (count === 0) {
      setShowAdd(true);
    }
  };

  useEffect(() => {
    if (count < 1) {
      setShowAdd(false);
    } else {
      setShowAdd(true);
    }
  }, [count]);

  return (
    <div
      id={id}
      className="position-relative menuCard border rounded-4 p-2 m-2 shadow-sm"
    >
      <div className="row">
        <div className="col-4">
          <div
            style={{
              backgroundImage: `url(${item_logo ? foodLogo : defaultFoodImg})`,
            }}
            className="foodImg rounded-4 h-100 w-100"
          ></div>
        </div>
        <div className="col-8">
          <h6 className="fw-bold text-start my-2">{name}</h6>
          <p className="description w-100 text-truncate">{long_desc}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-1 justify-content-center price">
              <div>₹</div>
              <h6 className="fs-4">{price}</h6>
            </div>
            {!showAdd && (
              <MyButton
                name={"Add Meal"}
                bgColor={"#44CE42"}
                color={"#fff"}
                padding={"5px 15px"}
                handleBtnClick={() => {
                  handleAdd();
                }}
              />
            )}
            {showAdd && (
              <div className="d-flex gap-2 align-items-center">
                <MdRemoveCircle
                  size={"25px"}
                  color="#FDC55E"
                  onClick={() => {
                    handleRemoveItem();
                  }}
                />
                <div className="fw-bold">{count}</div>
                <MdAddCircle
                  size={"25px"}
                  color="#FDC55E"
                  onClick={() => {
                    handleAddItem();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <BiSolidInfoCircle
        className="position-absolute top-0 end-0 m-2"
        color="#ff6347"
        onClick={() => {
          setShowModal(!showModal);
        }}
      />
      <ViewItemModal
        show={showModal}
        setShow={setShowModal}
        itemData={itemData}
      />
    </div>
  );
}

export default MenuCard;
