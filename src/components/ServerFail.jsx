import React from "react";
import styled from "styled-components";

import { IoAlertCircleSharp } from "react-icons/io5";
export const Backdrop = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;
const Container = styled.div`
  width: 20rem;
  height: 20rem;
  background-color: white;
  margin: auto;
  border-radius: 1rem;
  padding: 3rem 0 0 0;

  display: flex;
  flex-flow: column;

  align-items: center;
  box-shadow: 0 1rem 1rem grey;

  justify-content: space-between;

  div {
    display: flex;
    flex-flow: column;
    /* justify-content: center; */
    align-items: center;

    p:nth-child(1) {
      font-weight: 600;
      font-size: 1.05rem;
    }
  }

  button {
    width: 100%;
    margin-top: 1rem;
    background-color: #9343e1;
    color: white;
    border-radius: 0 0 1rem 1rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    font-size: 1.1rem;
    height: 4rem;
    transition: all 0.5s;

    &:hover {
      background-color: #9552d8;
    }
  }
`;
const ServerFail = ({ setServerFail }) => {
  return (
    <>
      <Backdrop>
        <Container>
          <IoAlertCircleSharp size={"35%"} color="#9552d8" />
          <div>
            <p>서버와의 통신이 불가능 합니다</p>
            <p>잠시 후에 다시 시도해 주세요</p>
          </div>
          <button onClick={() => setServerFail(false)}>확인</button>
        </Container>
      </Backdrop>
    </>
  );
};

export default ServerFail;
