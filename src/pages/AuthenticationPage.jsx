import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationStyles = styled.div`
  min-height: 100vh;
  padding: 40px;

  .logo {
    display: flex;
    justify-content: center;
  }
  .heading {
    font-size: 40px;
    margin-top: 40px;
    font-weight: 600;
    text-align: center;
    color: ${(props) => props.theme.blueTheme};
    margin-bottom: 60px;
  }
  .have-account {
    margin-bottom: 20px;
    text-transform: lowercase;
    font-weight: 400;
    font-size: 14px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
    }
  }
  .field-container {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationStyles>
      <div className="container">
        <NavLink to="/" className="logo">
          <img srcSet="/monkey.png 2x" alt="" />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationStyles>
  );
};

export default AuthenticationPage;
