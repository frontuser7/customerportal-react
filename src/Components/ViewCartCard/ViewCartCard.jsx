import React, { useState } from "react";
import "./ViewCartCard.css";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { BASE_URL } from "../../Config/Config";
import defaultFoodImg from "../../Assets/SVG/dish4.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { removeCart, updateCartItemCount } from "../../Store/cartItemsSlice";
import { updateCount } from "../../Store/restoMenuListSlice";
import { addCartItem, removeCartItem } from "../../Store/addToCartSlice";
import { cartInfo } from "../../Store/cartInfoSlice";
import { BiSolidInfoCircle } from "react-icons/bi";

function ViewCartCard() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  //  get data from store
  const restoSessionDetails = useSelector((state) => state.restoSession);
  const cartItemsDetails = useSelector((state) => state.cartItemData);
  const restoDetails = useSelector((state) => state.restoData);

  // destructure the data
  const { session_uuid } = restoSessionDetails;
  const { currency } = restoDetails;

  // urls
  const addOrder_url = `${BASE_URL}api/userapi/order/manage/add_on/`;

  // add order to db
  const handleOrder = async (id, mainId, type, count, itemdata) => {
    const extraItemArr = [];
    const extraItemData = cartItemsDetails.filter((item) => item.id === mainId);

    if (extraItemData.length) {
      for (let i = 0; i < extraItemData[0].session_extra_item.length; i++) {
        extraItemArr.push(extraItemData[0].session_extra_item[i].id);
      }
    }

    const data = {
      order_json: {
        session_uuid: session_uuid,
        item_id: id,
        manage_type: type,
        language_code: "en-us",
        extra_item: extraItemArr,
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
          if (count < 1) {
            dispatch(removeCart({ id: mainId }));
            dispatch(
              updateCount({
                id: id,
                count: 0,
              })
            );
          } else {
            dispatch(
              updateCartItemCount({
                id: mainId,
                count: count,
              })
            );
            dispatch(
              updateCount({
                id: id,
                count: count,
              })
            );
          }
          if (type == 0) {
            dispatch(removeCartItem(id));
          } else {
            dispatch(addCartItem(itemdata));
          }
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };

  const handleAdd = (id, mainId, type, count, itemdata) => {
    handleOrder(id, mainId, type, count, itemdata);
  };

  const handleRemove = (id, mainId, type, count, itemdata) => {
    handleOrder(id, mainId, type, count, itemdata);
  };
  return (
    <div className="mb-5 pb-5">
      {cartItemsDetails &&
        cartItemsDetails.map((itemdata) => (
          <div
            key={itemdata.id}
            className="position-relative menuCard border rounded-4 p-2 m-2 shadow-sm"
          >
            <div className="row">
              <div className="col-4">
                <div
                  style={{
                    backgroundImage: `url(${
                      itemdata.item.item_logo
                        ? BASE_URL + itemdata.item.item_logo
                        : defaultFoodImg
                    })`,
                  }}
                  className="foodImg rounded-4 w-100 h-100"
                ></div>
              </div>
              <div className="col-8">
                <h6 className="fw-bold text-start my-2">
                  {itemdata.item_name}
                </h6>
                {itemdata.session_extra_item.length ? (
                  <>
                    <div className="addons-info d-flex gap-2 flex-wrap">
                      <div className="fw-bold">Addon's : </div>
                      {itemdata.session_extra_item.map((item, index) => (
                        <div key={item.id}>
                          {item.extra_item}
                          {itemdata.session_extra_item.length - index == 1
                            ? "."
                            : ","}
                        </div>
                      ))}
                    </div>
                    <div
                      onClick={() => setShowModal(!showModal)}
                      className="customize my-2 d-flex align-items-center gap-1"
                    >
                      <BiSolidInfoCircle />
                      Customize your Addon's
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-1 justify-content-center price">
                    <div>{currency}</div>
                    <h6 className="fs-4">{itemdata.item_price}</h6>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <MdRemoveCircle
                      size={"25px"}
                      color="#FDC55E"
                      onClick={() => {
                        handleRemove(
                          itemdata.item.id,
                          itemdata.id,
                          0,
                          itemdata.item_count - 1,
                          itemdata.item
                        );
                      }}
                    />
                    <div className="fw-bold">{itemdata.item_count}</div>
                    <MdAddCircle
                      size={"25px"}
                      color="#FDC55E"
                      onClick={() => {
                        handleAdd(
                          itemdata.item.id,
                          itemdata.id,
                          1,
                          itemdata.item_count + 1,
                          itemdata.item
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ViewCartCard;
