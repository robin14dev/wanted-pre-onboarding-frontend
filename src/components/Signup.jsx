import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { validate, validInfo } from "../util/validation";
export const Container = styled.div`
  width: 20rem;
  height: 23rem;
  padding: 3rem 1rem;
  border-radius: 1rem;
  margin: 0 auto;
  margin-top: 5rem;
  background-color: transparent;
  box-shadow: 1px 1px 0.5rem lightgray;
  display: flex;
  flex-flow: column;

  align-items: center;

  .header {
    h1 {
      color: #9343e1;
    }
    margin-bottom: 2rem;
  }
  form {
    width: 90%;
    display: flex;
    flex-flow: column;

    .valid-msg {
      height: 1.5rem;
      font-size: 0.8rem;
      padding: 0.2rem;
      color: #9343e1;
    }

    input {
      height: 2rem;
      border: 1px solid lightgray;
      border-radius: 0.3rem;
      padding-left: 0.5rem;
    }

    button {
      transition: background-color 0.5s;
      margin-top: 1rem;
      width: 100%;
      background-color: #9343e1;
      color: white;
      height: 2rem;
      border-radius: 0.2rem;
      font-weight: 600;
      &:disabled {
        background-color: #9243e1aa;
      }
      position: relative;
    }
    .loading {
      span {
        visibility: hidden;
        opacity: 0.5;
        transition: all 0.2s;
      }

      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 4px solid transparent;
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: button-loading-spinner 1s ease infinite;
      }

      @keyframes button-loading-spinner {
        from {
          transform: rotate(0turn);
        }

        to {
          transform: rotate(1turn);
        }
      }
    }
  }
  .bottom {
    display: flex;
    font-size: 0.9rem;
    margin-top: 2rem;
    button {
      margin-left: 1rem;
      font-weight: 600;
      color: #9343e1;
    }
  }
`;

const Signup = ({ setServerFail }) => {
  const [userInfo, setUserInfo] = useState({
    email: { text: "", isValid: false },
    password: { text: "", isValid: false },
  });
  const [alert, setAlert] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    const type = e.target.dataset.testid.split("-")[0];
    const value = e.target.value;
    setUserInfo((prevInfo) => {
      const nextInfo = {
        ...prevInfo,
        [type]: { ...prevInfo[type], text: value },
      };
      return nextInfo;
    });

    const isValid = validate(type, value);

    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [type]: { ...prevInfo[type], isValid },
    }));
    if (isValid) {
      setAlert((prev) => ({ ...prev, [type]: "" }));
    } else {
      setAlert((prev) => ({ ...prev, [type]: validInfo.message[type] }));
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const result = await axios.post(
        `${process.env.REACT_APP_WAS}/auth/signup`,
        {
          email: userInfo.email.text,
          password: userInfo.password.text,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (result.status === 201 && result.statusText === "Created") {
        navigate("/signin");
      }
    } catch (error) {
      if (error.message === "Network Error" && error.name === "AxiosError") {
        setServerFail(true);
      }
      if (
        error.message === "Request failed with status code 400" &&
        error.name === "AxiosError" &&
        error.response.data.message === "동일한 이메일이 이미 존재합니다."
      ) {
        // 동일한 계정이 있는 경우
        const type = "email";
        const serverMsg = error.response.data.message;

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

  const { email, password } = userInfo;

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
          value={email.text}
        ></input>
        <div className="valid-msg">{email.text && alert.email}</div>
        <input
          spellCheck="false"
          type="password"
          required
          data-testid="password-input"
          placeholder="비밀번호를 입력해 주세요"
          onChange={onChangeHandler}
          value={password.text}
        ></input>
        <div className="valid-msg">{password.text && alert.password}</div>
        <button
          className={isLoading ? "loading" : undefined}
          type="submit"
          data-testid="signup-button"
          disabled={!email.isValid || !password.isValid}
        >
          <span>회원가입</span>
        </button>
      </form>
      <div className="bottom">
        <p>이미 계정이 있으신가요?</p>
        <button data-testid="signin-button" onClick={() => navigate("/signin")}>
          로그인
        </button>
      </div>
    </Container>
  );
};

export default Signup;
