import React from "react";
import { Fragment } from "react";
import Header from "./Header";

// ! trang nay de chua header o moi noi

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header></Header>
      {children}
    </Fragment>
  );
};

export default Layout;
