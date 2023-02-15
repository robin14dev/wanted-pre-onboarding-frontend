import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container as C } from "./Signup";
import { validate, validInfo } from "../util/validation";

const Container = styled(C)``;
const Signin = ({ setServerFail }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = userInfo;
  const inputRef = useRef(null);
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
      setIsLoading(true);
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
      let serverMsg;
      if (error.message === "Network Error" && error.name === "AxiosError") {
        setServerFail(true);
      }
      if (
        error.message === "Request failed with status code 404" &&
        error.name === "AxiosError" &&
        error.response.data.error === "Not Found"
      ) {
        const type = "email";
        serverMsg =
          error.response.data.message || "해당 사용자가 존재하지 않습니다.";
        //계정이 없는경우
        setAlert((prevAlert) => ({
          ...prevAlert,
          [type]: serverMsg,
        }));
      }
      if (
        error.message === "Request failed with status code 401" &&
        error.name === "AxiosError" &&
        error.response.statusText === "Unauthorized"
      ) {
        //계정이 있는데 비밀번호가 잘못된 경우
        const type = "password";
        serverMsg = "비밀번호가 일치하지 않습니다.";
        setAlert((prevAlert) => ({
          ...prevAlert,
          [type]: serverMsg,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Container>
      <div className="header">
        <h1>pre-onboarding</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        <input
          spellCheck="false"
          ref={inputRef}
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

        <button
          type="submit"
          data-testid="singin-button"
          className={isLoading ? "loading" : undefined}
        >
          <span>로그인</span>
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
