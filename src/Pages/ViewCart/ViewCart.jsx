import React, { useEffect, useState } from "react";
import "./ViewCart.css";
import ViewCartCard from "../../Components/ViewCartCard/ViewCartCard";
import ShowItems from "../../Components/ShowItems/ShowItems";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../Config/Config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartItemsData } from "../../Store/cartItemsSlice";
import KYCModal from "../../Components/Modals/KYCModal/KYCModal";

function ViewCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({});
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [userData, setUserData] = useState({
    personal_email: "",
    personal_name: "",
    personal_phone_no: "",
  });

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  // get data from store
  const restoDetails = useSelector((state) => state.restoData);
  const restoSessionDetails = useSelector((state) => state.restoSession);
  const ids = useSelector((state) => state.restoTableIds);
  const cartDetails = useSelector((state) => state.cartInfo);

  // destructure the data
  const { currency } = restoDetails;
  const { session_uuid } = restoSessionDetails;
  const { restaurantId, tableId } = ids;

  // urls
  const getCartItems_url = `${BASE_URL}api/userapi/order/details/add_on/${session_uuid}/en-us/`;
  const getKYC_URL = `${BASE_URL}api/check/personal/permission/${restaurantId}`;
  const placeOrder_URL = `${BASE_URL}api/userapi/order/place/`;

  // get cart items api function
  const getCartItems = async () => {
    await axios
      .get(getCartItems_url)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch(cartItemsData(res.data?.data.sessionitem_tablesession));
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network Error", "error");
      });
  };

  // get kyc api function
  const getKYC = async () => {
    await axios
      .get(getKYC_URL)
      .then((res) => {
        if (res.data.code === 200) {
          setUserDetails(res.data?.data.permission_list[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network Error", "error");
      });
  };

  // place order api function
  const placeOrder = async () => {
    let data = new FormData();
    data.append("session_uuid", session_uuid);
    data.append("language_code", "en-us");
    data.append("instruction", "");
    data.append("name", userData.personal_name);
    data.append("email", userData.personal_email);
    data.append("phone_number", userData.personal_phone_no);
    await axios
      .post(placeOrder_URL, data)
      .then((res) => {
        if (res.data.code === 200) {
          setUserData({
            personal_email: "",
            personal_name: "",
            personal_phone_no: "",
          });
          setShowKYCModal(false);
          navigate(`/shops/ordersummery/${restaurantId}/${tableId}`);
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };

  const handlePlaceOrder = () => {
    if (
      userDetails.personal_email ||
      userDetails.personal_name ||
      userDetails.personal_phone_no
    ) {
      setShowKYCModal(!showKYCModal);
    } else {
      placeOrder();
    }
  };

  useEffect(() => {
    getCartItems();
    getKYC();
  }, []);

  return (
    <div>
      <ViewCartCard />
      {cartDetails.itemCount ? (
        <div className="position-fixed bottom-0 w-100">
          <ShowItems
            buttonName={"Place Order"}
            backgroundColor={"#e7fde7"}
            color={"#44CE42"}
            handleClick={handlePlaceOrder}
            currency={currency}
          />
        </div>
      ) : (
        ""
      )}
      <KYCModal
        kycStatus={userDetails}
        showKYCModal={showKYCModal}
        setShowKYCModal={setShowKYCModal}
        userData={userData}
        setUserData={setUserData}
        placeOrder={placeOrder}
      />
    </div>
  );
}

export default ViewCart;
