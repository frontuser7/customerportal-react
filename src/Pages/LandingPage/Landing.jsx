import React, { useEffect, useState } from "react";
import "./Landing.css";
import chef from "../../Assets/SVG/chef.svg";
import MyButton from "../../Components/MyButton/MyButton";
import { BiLogoFacebook, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Config/Config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { restoTableId } from "../../Store/restoTableIdSlice";
import { restoData } from "../../Store/restoDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { restoLanguage } from "../../Store/restoLanguageSlice";
import PinModal from "../../Components/Modals/PinModal/PinModal";
import { restoSession } from "../../Store/restoSessionSlice";
import { menuData } from "../../Store/restoMenuListSlice";

function Landing() {
  // get ids from url
  let { restaurantId, tableId } = useParams();

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  // state management
  const [check, setCheck] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [checkPin, setCheckPin] = useState("");

  const dispatch = useDispatch();

  // store this Ids in react store
  dispatch(
    restoTableId({
      restaurantId,
      tableId,
    })
  );

  // get data from redux store
  const restoDetails = useSelector((state) => state.restoData);
  const restoSessionDetails = useSelector((state) => state.restoSession);

  // destructure data
  const { is_pin_enable } = restoDetails;
  const { session_uuid } = restoSessionDetails;

  // Urls
  let getRestoData_url = `${BASE_URL}api/userapi/restaurant/landing/${restaurantId}/${tableId}/`;
  let getLangData_url = `${BASE_URL}api/userapi/language/list/${restaurantId}`;
  let createNewSession_url = `${BASE_URL}api/userapi/restaurant/create/session/pin/`;
  const joinwithpin_url = `${BASE_URL}api/userapi/restaurant/get/uuid/pin/`;
  const getMenuList_url = `${BASE_URL}api/userapi/restaurant/all/menu_new/${session_uuid}/en-us`;

  // for Navigation
  const navigate = useNavigate();

  // getRestaurantDetails api function
  const getRestaurantDetails = async () => {
    await axios
      .get(getRestoData_url)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch(restoData(res.data.data));
        } else {
          notify("Network Error", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network Error", "error");
      });
  };

  // get language details api function
  const getLanguageDetails = async () => {
    await axios
      .get(getLangData_url)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch(restoLanguage(res.data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // start newSession api function
  const startNewSession = async () => {
    let data = new FormData();
    data.append("restaurant_table", tableId);
    data.append("restaurant", restaurantId);
    await axios
      .post(createNewSession_url, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          dispatch(restoSession(res.data.data));
          getMenu();
        } else {
          notify("Fail to create session", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Network Error", "error");
      });
  };

  // start pin session api function
  const startPinSession = async () => {
    if (checkPin.length) {
      let data = new FormData();
      data.append("session_pin", checkPin);
      await axios
        .post(joinwithpin_url, data)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "error") {
            notify("Please enter correct pin", "error");
          } else {
            setCheckPin("");
            setShowPinModal(false);
            getMenu();
          }
        })
        .catch((err) => {
          notify("Network Error", "error");
          console.log(err);
        });
    } else {
      notify("Please enter pin to start", "info");
    }
  };

  // get menu list api function
  const getMenu = async () => {
    await axios
      .get(getMenuList_url)
      .then((res) => {
        if (res.data.code === 200) {
          dispatch(menuData(res.data.data.item));
          navigate(`/shops/menu/${restaurantId}/${tableId}`);
        }
      })
      .catch((err) => {
        console.log(err);
        notify("Fail to get Menu List", "error");
      });
  };

  // handle Get Started
  const handleStarted = () => {
    if (check) {
      if (is_pin_enable) {
        setShowPinModal(!showPinModal);
      } else {
        if (!session_uuid) {
          startNewSession();
        } else {
          getMenu();
        }
      }
    } else {
      notify("Please accept terms & condition", "info");
    }
  };

  useEffect(() => {
    getRestaurantDetails();
    getLanguageDetails();
  }, []);

  return (
    <div className="position-relative">
      <div className="text-center">
        <img src={chef} alt="" className="landing-chef position-relative" />
      </div>
      <div
        style={{
          transform: "translateY(-5vh)",
        }}
        className="position-absolute details-card rounded-5 text-center pb-5"
      >
        <div className="resto-name fw-bold p-3">{restoDetails.name}</div>
        <p className="resto-desc mx-2">{restoDetails.description}</p>
        <div className="d-flex justify-content-center align-items-center m-2 gap-2">
          <input
            type="checkbox"
            className="tnc-checkbox"
            value={check}
            onChange={(e) => {
              setCheck(e.target.checked);
            }}
          />
          <div className="tnc">
            I agree to the Terms and Conditions and Privacy Policy.
          </div>
        </div>
        <div className="py-3">
          <MyButton
            name={"Get Started"}
            color={"#fff"}
            bgColor={"#44CE42"}
            handleBtnClick={handleStarted}
          />
        </div>
        <PinModal
          setShowPinModal={setShowPinModal}
          showPinModal={showPinModal}
          checkPin={checkPin}
          setCheckPin={setCheckPin}
          startPinSession={startPinSession}
          startNewSession={startNewSession}
          getMenu={getMenu}
        />
        <div className="resto-address mx-2 mt-3 p-3 rounded-4">
          <div className="mb-2 fw-bold">GET IN TOUCH</div>
          <div className="text-start">
            <div className="fw-bold">
              Address :{" "}
              <span className="fw-normal">{restoDetails.address}</span>
            </div>
            <div className="fw-bold">
              Phone No :{" "}
              <span className="fw-normal">{restoDetails.phone_number}</span>
            </div>
          </div>
        </div>
        <div className="w-100 copyright">
          <hr className="border opacity-50 w-100" />
          <div className="text-center">Copyright © All rights reserved.</div>
          <div className="d-flex gap-2 justify-content-center align-items-center mt-1">
            <BiLogoFacebook />
            <BiLogoTwitter />
            <BiLogoYoutube />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
