import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container as C, validate, validInfo } from "./Signup";

const Container = styled(C)``;
const Signin = () => {
  /*
  Assignment 3
로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 /todo 경로로 이동해주세요

로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
응답받은 JWT는 로컬 스토리지에 저장해주세요
Assignment 4
로그인 여부에 따른 리다이렉트 처리를 구현해주세요

로컬 스토리지에 토큰이 있는 상태로 /signin 또는 /signup 페이지에 접속한다면 /todo 경로로 리다이렉트 시켜주세요
로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 /signin 경로로 리다이렉트 시켜주세요
  */

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ email: "", password: "" });
  const { email, password } = userInfo;

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const type = e.target.dataset.testid.split("-")[0];
    const value = e.target.value;
    if (alert[type].length) {
      setAlert((prevAlert) => ({ ...prevAlert, [type]: "" }));
    }

    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [type]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    /*
    유효성 검사 실패시 알려주기 
    */

    try {
      let isfullfilled = true;
      for (const type in userInfo) {
        if (validate(type, userInfo[type]) === false) {
          if (isfullfilled) isfullfilled = false;
          /* 일단 배열 다 돌고나서 해야되는디? */
          setAlert((prevAlert) => ({
            ...prevAlert,
            [type]: validInfo.message[type],
          }));
        }
      }
      if (isfullfilled === false) return;

      const result = await axios.post(
        `${process.env.REACT_APP_WAS}/auth/signin`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const { status, statusText, data } = result;
      console.log(result);
      if (status === 200 && statusText === "OK") {
        console.log(data);
        localStorage.setItem("access_token", data["access_token"]);
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      console.log("here");
      navigate("/todo");
    }
  }, []);

  return (
    <Container>
      <div className="header">
        <h1>pre-onboarding</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          required
          data-testid="email-input"
          placeholder="이메일을 입력해 주세요"
          onChange={onChangeHandler}
          value={email}
        ></input>
        <div className="valid-msg">{email && alert.email}</div>

        <input
          type="password"
          required
          data-testid="password-input"
          placeholder="비밀번호를 입력해 주세요"
          onChange={onChangeHandler}
          value={password}
        ></input>
        <div className="valid-msg">{password && alert.password}</div>

        <button type="submit" data-testid="singin-button">
          로그인
        </button>
      </form>
      <div className="bottom">
        <p>아직 계정이 없으신가요?</p>
        <button data-testid="signup-button" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </div>
    </Container>
  );
};

export default Signin;
