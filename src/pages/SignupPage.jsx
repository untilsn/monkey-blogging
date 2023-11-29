import React from "react";
import styled from "styled-components";
import Label from "../components/lables/Label";
import Input from "../components/inputs/Input";
import { useForm } from "react-hook-form";
import IconEyeClose from "../components/icons/IconEyeClose";
import Field from "../components/field/Field";
import { useState } from "react";
import IconEyeOpen from "../components/icons/IconEyeOpen";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebase-app/Firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "../components/inputs/InputPasswordToggle";
import slugify from "slugify";

// const SignupPageStyles = styled.div`
//   min-height: 100vh;
//   padding: 40px;

//   .logo {
//     display: flex;
//     justify-content: center;
//   }
//   .heading {
//     font-size: 40px;
//     margin-top: 40px;
//     font-weight: 600;
//     text-align: center;
//     color: ${(props) => props.theme.blueTheme};
//     margin-bottom: 60px;
//   }
//   .field-container {
//     max-width: 600px;
//     margin: 0 auto;

//     /* .input::-webkit-input-placeholder {
//         {input-placehodder}
//       }
//       .input::-moz-input-placeholder {
//       } */
//   }
// `;

const SignupPage = () => {
  // chuyen ve trang chu
  const navigate = useNavigate();
  // validate
  const schema = yup.object({
    fullname: yup.string().required("please enter your full name"),
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
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
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

  const handleSignUp = async (values) => {
    if (!isValid) return null;
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    // add collection
    const colRef = collection(db, "users");
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
    });
    // await addDoc(colRef, {
    //   fullname: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });

    toast.success("register success!");
    navigate("/");
  };

  return (
    <AuthenticationPage>
      {/* <div className="container">
        <div className="logo">
          <img srcSet="/monkey.png 2x" alt="" />
        </div>
        <h1 className="heading">Monkey Blogging</h1> */}
      <form className="field-container" onSubmit={handleSubmit(handleSignUp)}>
        {/* user name */}
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Please enter your fullname"
            control={control}
          />
        </Field>
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
        {/* password */}
        <Field>
          <Label htmlFor="password">password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          Already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <div>
          <Button
            style={{ width: "100%", margin: "60px auto" }}
            type="submit"
            $isloading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </div>
      </form>
      {/* </div> */}
    </AuthenticationPage>
  );
};

export default SignupPage;
