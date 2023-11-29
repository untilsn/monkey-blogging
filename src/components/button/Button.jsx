import React from "react";
import styled, { css } from "styled-components";
import LoadingSpinner from "../loading/Loading";
import PropTypes, { string } from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 20px;
  line-height: 1;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
  max-width: 250px;
  height: ${(props) => props.height || "70px"};
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.kind === "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.blueTheme};
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  &:active {
    transform: scale(0.95);
  }
`;

/**
 *
 * @param {*} onClick Handle on submit
 * @requires
 * @param {string} type Type of button (button || submmit)
 * @returns
 */

const Button = ({
  type = "button",
  children,
  kind = "primary",
  onClick = () => {},
  ...props
}) => {
  const { $isloading, to } = props;
  const child = !!$isloading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string")
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]).isRequired,
  isloading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
