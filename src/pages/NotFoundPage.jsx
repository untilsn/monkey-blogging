import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    align-items: center; /* Căn giữa theo chiều cao */
    justify-content: center; /* Căn giữa theo chiều rộng */
    height: 100vh; /* Chiều cao 100% của viewport */
    margin-left: auto;
    margin-right: auto;
    user-select: none;
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      .logo {
        max-width: 100px;
      }
      span {
        font-size: 150px;
        font-weight: 600;
      }
    }
    .text {
      font-size: 70px;
      margin-top: 40px;
      font-weight: 600;
      text-align: center;
    }
    .button {
      color: white;
      padding: 20px;
      border-radius: 12px;
      margin-top: 50px;
      margin-left: auto;
      margin-right: auto;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    }
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles className="container">
      <div className="content">
        <div className="header">
          <span>4</span>
          <img srcSet="./monkey.png 2x" alt="monkey-img" className="logo" />
          <span>4</span>
        </div>
        <h1 className="text">Oops Nothing Here !!</h1>
        <NavLink to="/" className="button">
          Back to home
        </NavLink>
      </div>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
