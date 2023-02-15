import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container as C } from "./Signup";
import { validate, validInfo } from "../util/validation";

const Container = styled(C)``;
const Signin = () => {
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

    try {
      let isfullfilled = true;
      for (const type in userInfo) {
        if (validate(type, userInfo[type]) === false) {
          if (isfullfilled) isfullfilled = false;
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
      if (status === 200 && statusText === "OK") {
        localStorage.setItem("access_token", data["access_token"]);
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
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
