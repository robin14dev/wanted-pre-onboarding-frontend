import React from "react";
import styled from "styled-components";

const PreContainer = styled.div`
  background-color: #ebe4f9;
  padding: 5rem 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ebe4f9;
  margin: 0 auto;
  padding: 0 10rem;
  /* height: 50vh; */
  /* margin-top: 5rem; */
  max-width: 1060px;
  .left {
    width: 40%;
    /* background-color: antiquewhite; */
    display: flex;
    /* justify-content: center;
    align-items: center; */
    align-items: center;
  }

  img {
    width: 20rem;
    height: 100%;
    object-fit: contain;
  }
`;
const Main = () => {
  return (
    <PreContainer>
      <Container>
        <div className="left">
          <p>
            <h2>wanted</h2>
            <h1>Pre Onboarding</h1>
            <h1>Internship</h1>
          </p>
        </div>
        <img
          alt="프리온보딩로고"
          src="https://static.wanted.co.kr/images/wantedplus_event/preonboarding/v2_frontend_7/main_img.png"
        ></img>
      </Container>
    </PreContainer>
  );
};

export default Main;
