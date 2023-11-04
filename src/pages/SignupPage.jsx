import React from "react";
import styled from "styled-components";
import Label from "../components/lables/Label";

const SignupPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;

  .logo {
    display: flex;
    justify-content: center;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.blueTheme};
    margin-bottom: 60px;
  }
  .field-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    .field {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .input {
        padding: 20px;
        border-radius: 8px;
        font-size: 15px;
        transition: all 0.2s linear;
        border: 1px solid transparent;
        background-color: ${(props) => props.theme.grayLight};
        outline: none;
      }
      .input:focus {
        background-color: white;
        border-color: ${(props) => props.theme.primary};
      }
      /* .input::-webkit-input-placeholder {
        {input-placehodder}
      }
      .input::-moz-input-placeholder {
      } */
    }
  }
`;

const SignupPage = () => {
  return (
    <SignupPageStyles>
      <div className="container">
        <div className="logo">
          <img srcSet="/monkey.png 2x" alt="" />
        </div>
        <h1 className="heading">Monkey Blogging</h1>
        <form className="field-container">
          <div className="field">
            <Label htmlFor="fullname">Fullname</Label>
            <input
              type="text"
              id="fullname"
              placeholder="Please enter your fullname"
              className="input"
            />
          </div>
        </form>
      </div>
    </SignupPageStyles>
  );
};

export default SignupPage;
