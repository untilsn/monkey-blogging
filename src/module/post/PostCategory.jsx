import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  padding: 8px 12px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  a {
    display: block;
  }
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
`;

const PostCategory = ({
  to = "/",
  children,
  type = "primary",
  className = "",
}) => {
  return (
    <PostCategoryStyles type={type} className={className}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  );
};

export default PostCategory;
