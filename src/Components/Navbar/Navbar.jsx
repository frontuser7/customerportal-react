import React from "react";
import "./Navbar.css";
import defaultLogo from "../../Assets/Logo/qr4order_black.png";
import { MdLanguage } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { BsFillCartFill } from "react-icons/bs";
import { MdNavigateBefore } from "react-icons/md";
import { PiCallBellFill } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { menuData } from "../../Store/restoMenuListSlice";
import { BASE_URL } from "../../Config/Config";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for notification
  const notify = (notification, type) =>
    toast(notification, { autoClose: 2000, theme: "colored", type: type });

  // get data from store
  const ids = useSelector((state) => state.restoTableIds);
  const restoSessionDetails = useSelector((state) => state.restoSession);

  // destructure the data
  const { restaurantId, tableId } = ids;
  const { session_uuid } = restoSessionDetails;

  // urls
  const getMenuList_url = `${BASE_URL}api/userapi/restaurant/all/menu_new/${session_uuid}/en-us`;
  const waiterHelp_URL = `${BASE_URL}api//userapi/waiter/help/${session_uuid}`;

  const handleLanguage = (lang) => {
    localStorage.setItem("language", lang);
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

  // Call waiter function
  const waiterHelp = async () => {
    notify("Please wait, Waiter is on the way", "success");
    await axios
      .get(waiterHelp_URL)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        notify("Network error", "error");
      });
  };
  return (
    <div className="navbar p-2 d-flex justify-content-between align-items-center sticky-top bg-white">
      <div className="d-flex justify-content-between align-items-center gap-3">
        {!location.pathname.includes("landing") && (
          <MdNavigateBefore
            size={"25px"}
            onClick={() => {
              if (location.pathname.includes("menu")) {
                navigate(`/shops/landing/${restaurantId}/${tableId}`);
              } else {
                getMenu();
              }
            }}
          />
        )}
        <img
          src={defaultLogo}
          alt="logo"
          className="logo rounded ms-2"
          onClick={() => {
            if (location.pathname.includes("landing")) {
              navigate("/shops/landing/2/3");
            } else {
              navigate("/shops/menu/2/3");
            }
          }}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center gap-3 ms-auto me-2">
        {location.pathname.includes("menu") && (
          <PiCallBellFill onClick={waiterHelp} size={"20px"} />
        )}
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            style={{ padding: 0 }}
          >
            <MdLanguage size={20} color="#000" />
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ marginTop: 0 }}>
            <Dropdown.Item onClick={() => handleLanguage("en")}>
              English
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguage("ro")}>
              Romania
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguage("uk")}>
              Ukraine
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <TbReload
          size={"20px"}
          onClick={() => {
            window.location.reload();
          }}
        />
        {!location.pathname.includes("landing") && (
          <BsFillCartFill size={"20px"} />
        )}
      </div>
    </div>
  );
}

export default Navbar;
