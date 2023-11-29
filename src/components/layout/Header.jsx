import React from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth-context";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
const HeaderStyles = styled.div`
  .header-main {
    display: flex;
    align-items: center;
    padding-top: 15px;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    .menu-item {
      letter-spacing: 0.4px;
      font-weight: 600;
    }
  }
  .search {
    margin-left: auto;
    border: 1px solid #cfcfcf;
    position: relative;
    max-width: 320px;
    width: 100%;
    border-radius: 8px;
    flex: 1;
    margin-right: 20px;
    padding: 15px;
    .search-input {
      letter-spacing: 0.5px;
      border: transparent;
      outline: none;
      font-size: 14px;
      width: 100%;
      padding-right: 45px;
      padding-left: 10px;
    }
    .search-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
  }
  .header-button {
  }
`;

function getLastName(name) {
  if (!name) return "user";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img srcSet="./monkey.png 2x" alt="monkey-img" className="logo" />
          </NavLink>

          <ul className="menu">
            {menuLinks.map((item) => {
              return (
                <li className="menu-item" key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {" "}
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {/* <NavLink to="/sign-up"> */}
          {!userInfo ? (
            <Button
              to={"/sign-up"}
              className="header-button"
              type="button"
              height="53px"
            >
              Sign Up
            </Button>
          ) : (
            <div className="header-auth">
              <span>Welcome back, </span>
              <strong className="text-primary">
                {" "}
                {getLastName(userInfo?.displayName)}
              </strong>
            </div>
          )}
          {/* </NavLink> */}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
