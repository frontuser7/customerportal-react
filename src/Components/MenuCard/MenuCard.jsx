import React, { useEffect, useState } from "react";
import "./MenuCard.css";
import MyButton from "../MyButton/MyButton";
import ViewItemModal from "../Modals/ViewItemModal/ViewItemModal";
import { BiSolidInfoCircle } from "react-icons/bi";
import defaultFoodImg from "../../Assets/SVG/dish4.svg";
import { BASE_URL } from "../../Config/Config";
import { MdRemoveCircle, MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCount } from "../../Store/restoMenuListSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { cartInfo } from "../../Store/cartInfoSlice";
import { useNavigate } from "react-router-dom";

function MenuCard({ itemData, currency }) {
  // for navigation
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  //  get data from store
  const restoSessionDetails = useSelector((state) => state.restoSession);
  const ids = useSelector((state) => state.restoTableIds);

  // destructure the data
  const { session_uuid } = restoSessionDetails;
  const { restaurantId, tableId } = ids;

  // urls
  const addOrder_url = `${BASE_URL}api/userapi/order/manage/add_on/`;

  const dispatch = useDispatch();

  const { id, item_logo, long_desc, name, price, count, extra_item_item } =
    itemData;

  const foodLogo = BASE_URL + item_logo;

  // add order to db
  const handleOrder = async (type) => {
    const data = {
      order_json: {
        session_uuid: session_uuid,
        item_id: id,
        manage_type: type,
        language_code: "en-us",
        extra_item: [],
      },
    };
    await axios
      .post(addOrder_url, data)
      .then((res) => {
        console.log("order", res);
        if (res.data.code === 200) {
          dispatch(
            cartInfo({
              itemCount: res.data.data.total_item_count,
              totalPrice: res.data.data.total_cart_amount,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };

  // handle Add btn
  const handleAdd = () => {
    if (extra_item_item.length) {
      setShowModal(!showModal);
    } else {
      setShowAdd(!showAdd);
      dispatch(
        updateCount({
          id: id,
          count: count + 1,
        })
      );
      handleOrder(1);
    }
  };

  // handle add item
  const handleAddItem = () => {
    if (extra_item_item.length) {
      setShowModal(!showModal);
    } else {
      dispatch(
        updateCount({
          id: id,
          count: count + 1,
        })
      );
      handleOrder(1);
    }
  };

  // handle remove item
  const handleRemoveItem = () => {
    if (extra_item_item.length) {
      navigate(`/shops/cart/${restaurantId}/${tableId}`);
    } else {
      dispatch(
        updateCount({
          id: id,
          count: count - 1,
        })
      );
      handleOrder(0);
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
              <div>{currency}</div>
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
        count={count}
      />
    </div>
  );
}

export default MenuCard;
