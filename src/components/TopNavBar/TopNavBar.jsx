import React, { useState } from "react";
import "./TopNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";
import logo from "../../assets/logo.png";
import istudio from "../../assets/istudio.png";
import ibuilder from "../../assets/ibuilder.png";

const { Option } = Select;

const TopNavBar = ({ children, onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [environment, setEnvironment] = useState("prod");
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleMenuClick = (url, showIframe, newTab) => {
    if (newTab) {
      window.open(url, "_blank");
    } else if (showIframe) {
      navigate("/data-modelling", { state: { iframeUrl: url, environment } });
    } else {
      navigate(url);
    }
  };

  // const handleEnvironmentChange = (value) => {
  //   setEnvironment(value);
  // };

  const menuItems = [
    {
      label: <img src={istudio} alt="iStudio" className="menu-icon istuido" />,
      url: "/studio",
      newTab: true,
    },
    {
      label: <img src={ibuilder} alt="iBuilder" className="menu-icon ibuilder" />,
      children: [
        {
          label: "iBuilder Cube",
          url: "https://cloud.cube.dev",
          newTab: true,
          showIframe: true,
        },
        {
          label: "iBuilder Model Management",
          url: "http://44.204.61.35:5000",
          showIframe: true,
        },
      ],
    },
  ];

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <img src={logo} alt="InceptiveBI Logo" className="logo-image" />
          </Link>
        </div>
        <div className="left-menu">
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onMouseEnter={item.children ? handleMouseEnter : null}
                onMouseLeave={item.children ? handleMouseLeave : null}
              >
                <button
                  onClick={() =>
                    !item.children && handleMenuClick(item.url, item.showIframe, item.newTab)
                  }
                >
                  {item.label}
                </button>
                {item.children && showDropdown && (
                  <div className="dropdown">
                    {item.children.map((child, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleMenuClick(child.url, child.showIframe, child.newTab)
                        }
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default TopNavBar;
