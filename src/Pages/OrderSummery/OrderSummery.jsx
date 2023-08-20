import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Config/Config";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import OrderTable from "../../Components/Table/OrderTable";
import TablePin from "../../Components/TablePin/TablePin";
import "./OrderSummery.css";
import { useNavigate } from "react-router-dom";

function OrderSummery() {
  const navigate = useNavigate();
  const [pendingOrder, setPendingOrder] = useState([]);
  const [confirmOrder, setConfirmOrder] = useState([]);
  const [orderNo, setOrderNo] = useState(null);
  let orderArr = [];

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  // get sessionUUID from redux store
  const restoSessionDetails = useSelector((state) => state.restoSession);

  //destructure the data
  let { session_uuid } = restoSessionDetails;

  //urls
  const getOrderSummery_URL = `${BASE_URL}api/userapi/order/status/${session_uuid}/en-us`;

  // function to get order summary
  const getOrderSummery = async () => {
    await axios
      .get(getOrderSummery_URL)
      .then((res) => {
        setPendingOrder(res.data.data.session_placed_item);
        setConfirmOrder(res.data.data.session_confirmed_item);
        setOrderNo(res.data.data.new_session_order_no);
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };

  useEffect(() => {
    getOrderSummery();
  }, []);

  // console.log(pendingOrder[0].order_detail);
  if (pendingOrder.length > 0) {
    for (let i = 0; i < pendingOrder.length; i++) {
      pendingOrder[i].order_detail.forEach((item) => {
        item.order_status = "Pending";
        orderArr.push(item);
      });
    }
  }
  if (confirmOrder.length > 0) {
    for (let i = 0; i < confirmOrder.length; i++) {
      confirmOrder[i].order_detail.forEach((item) => {
        item.order_status = "Confirmed";
        orderArr.push(item);
      });
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="mt-2">
        <TablePin name={"Order No"} value={orderNo} />
      </div>
      <div className="px-1 mt-3 mb-5 pb-2 w-100">
        <OrderTable data={orderArr} />
      </div>
      <div className="position-fixed bottom-0 w-100 shadow-sm">
        <div className="d-flex justify-content-center mb-2 align-items-center gap-2 w-100">
          <button
            className={`btn-text ${
              confirmOrder.length == 0 ? "w-100" : "rounded"
            } p-2`}
          >
            Add More Items
          </button>
          {pendingOrder.length < 1 && (
            <button
              onClick={() => {
                navigate(`/shops/bill/${session_uuid}`);
              }}
              className="btn-text p-2 rounded"
            >
              View Bill
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderSummery;
