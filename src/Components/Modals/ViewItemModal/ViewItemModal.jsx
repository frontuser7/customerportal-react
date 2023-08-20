import React, { useState } from "react";
import "./ViewItemModal.css";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from "../../../Config/Config";
import defaultFoodImg from "../../../Assets/SVG/dish4.svg";
import MyButton from "../../MyButton/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { updateCount } from "../../../Store/restoMenuListSlice";
import { addCartItem, removeCartItem } from "../../../Store/addToCartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { cartInfo } from "../../../Store/cartInfoSlice";

function ViewItemModal({ show, setShow, itemData, count }) {
  const handleClose = () => setShow(false);
  const [selectedExtraItem, setSelectedExtraItem] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(itemData.price);

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  // get data from store
  const restoSessionDetails = useSelector((state) => state.restoSession);
  const restoDetails = useSelector((state) => state.restoData);

  // destructure the data
  const { session_uuid } = restoSessionDetails;
  const { currency } = restoDetails;

  // urls
  const addOrder_url = `${BASE_URL}api/userapi/order/manage/add_on/`;

  const dispatch = useDispatch();

  // handle extra items function
  const handleSelect = (e) => {
    const { name, checked, value } = e.target;
    setSelectedExtraItem((prevState) => ({ ...prevState, [name]: checked }));
    if (checked) {
      setTotalCartPrice(totalCartPrice + Number(value));
    } else {
      if (totalCartPrice > itemData.price) {
        setTotalCartPrice(totalCartPrice - Number(value));
      }
    }
  };
  // add order to db
  const handleOrder = async (type) => {
    const extraItemIdArr = [];
    if (selectedExtraItem) {
      for (const key in selectedExtraItem) {
        if (selectedExtraItem[key] === true) {
          extraItemIdArr.push(Number(key));
        }
      }
    }

    const data = {
      order_json: {
        session_uuid: session_uuid,
        item_id: itemData.id,
        manage_type: type,
        language_code: "en-us",
        extra_item: extraItemIdArr,
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

  const handleAdd = () => {
    dispatch(
      updateCount({
        id: itemData.id,
        count: count + 1,
      })
    );
    dispatch(addCartItem(itemData));
    handleOrder(1);
    setSelectedExtraItem(false);
    setShow(false);
  };

  return (
    <>
      {itemData && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div id={itemData.id} className="row">
              <div className="col-12">
                <div
                  style={{
                    backgroundImage: `url(${
                      itemData.item_logo
                        ? BASE_URL + itemData.item_logo
                        : defaultFoodImg
                    })`,
                  }}
                  className="itemImg w-100 rounded-2"
                ></div>
              </div>
              <div className="col-12">
                <h5 className="fw-bold mt-3">{itemData.name}</h5>
                {itemData.long_desc && (
                  <p className="item-description">{itemData.long_desc}</p>
                )}
                <div className="col-12 Itemtype">
                  <div className="d-flex gap-2">
                    <div className="fw-bold">Category :</div>
                    <div>{itemData.category.name}</div>
                  </div>
                </div>
                <div className="col-12 Itemtype mb-2">
                  <div className="d-flex gap-2">
                    <div className="fw-bold">Sub Category :</div>
                    <div>{itemData.subcategory.name}</div>
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <div className="fw-bold">Price : </div>
                  <div className="d-flex gap-1 justify-content-start price">
                    <div>{currency}</div>
                    <div className="fs-3 fw-bold">{itemData.price}</div>
                  </div>
                </div>
                {/* Addons */}
                {itemData.extra_item_item.length ? (
                  <>
                    <h6 className="fw-bold mt-3">Add-Ons</h6>
                    {itemData.extra_item_item.map((item) => (
                      <div
                        key={item.id}
                        className="row align-items-center mb-1"
                      >
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
                      <div className="fs-3 fw-bold">{totalCartPrice}</div>
                    </div>
                  </div>
                  <div>
                    <MyButton
                      name={"Add Meal"}
                      bgColor={"#44CE42"}
                      color={"#fff"}
                      padding={"5px 15px"}
                      handleBtnClick={handleAdd}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ViewItemModal;
