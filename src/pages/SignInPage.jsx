import React from "react";
import { useAuth } from "../context/Auth-context";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import Label from "../components/lables/Label";
import Input from "../components/inputs/Input";
import Field from "../components/field/Field";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/Firebase-config";
import InputPasswordToggle from "../components/inputs/InputPasswordToggle";

const SignInPage = () => {
  const schema = yup.object({
    email: yup
      .string()
      .email("please enter valid email address")
      .required("enter your email address"),
    password: yup
      .string()
      .min(8, "Your passwork must be at least 8 characters or greater")
      .required("please enter you passwork"),
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    control,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  useEffect(() => {
    const arrErros = Object.values(errors);
    // bien errors thang 1 array
    if (arrErros.length > 0) {
      toast.error(arrErros[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login Page";
    // if (userInfo?.email) navigate("/");
  }, []);
  const handleSignIn = (values) => {
    if (!isValid) return;
    signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  return (
    <AuthenticationPage>
      <form className="field-container" onSubmit={handleSubmit(handleSignIn)}>
        {/* email */}
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Please enter your email"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Don't have an account? <NavLink to={"/sign-up"}>Register</NavLink>
        </div>

        <Button
          style={{ width: "100%", margin: "60px auto" }}
          type="submit"
          $isloading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
