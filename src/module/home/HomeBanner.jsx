import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";

const HomeBannerStyles = styled.div`
  margin-top: 50px;
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.blueTheme}
  );

  .banner {
    display: flex;
    align-items: center;
    &-content {
      align-items: start;
      justify-content: start;
      margin-top: 100px;
      color: white;
      h1 {
        font-weight: 700;
        font-size: 48px;
        margin-bottom: 20px;
      }
      span {
        line-height: 1.75;
        margin-bottom: 40px;
      }
      flex: 1;
      margin-left: auto;
      margin-right: auto;
    }
    &-image {
      flex: 1;
      img {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1>Monkey Blogging</h1>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
            <Button
              type="button"
              style={{ width: "100%", margin: "60px 0" }}
              kind="secondary"
              to={"/sign-up"}
            >
              Get Start
            </Button>
          </div>
          <div className="banner-image">
            <img srcSet="./logo-banner.png 2x" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
