import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  padding: 0 5px;
  color: ${(props) => props.theme.gray4b};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
