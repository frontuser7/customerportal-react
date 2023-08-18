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

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguage = (lang) => {
    localStorage.setItem("language" , lang)
  }
  return (
    <div className="navbar p-2 d-flex justify-content-between align-items-center sticky-top bg-white">
      <div className="d-flex justify-content-between align-items-center gap-3">
        {!location.pathname.includes("landing") && (
          <MdNavigateBefore
            size={"25px"}
            onClick={() => {
              if (location.pathname.includes("menu")) {
                navigate("/shops/landing/2/3");
              } else {
                navigate("/shops/menu/2/3");
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
        {location.pathname.includes("menu") && <PiCallBellFill size={"20px"} />}
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            style={{ padding: 0 }}
          >
            <MdLanguage size={20} color="#000" />
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ marginTop: 0 }}>
            <Dropdown.Item onClick={() => handleLanguage("en")}>English</Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguage("ro")}>Romania</Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguage("uk")}>Ukraine</Dropdown.Item>
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
