import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import IconEyeClose from "../icons/IconEyeClose";
import IconEyeOpen from "../icons/IconEyeOpen";
import Input from "./Input";

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      {" "}
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Please enter your password"
        control={control}

        // hasIcon // react tu dong hieu day la 'true'
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
