import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
export const Container = styled.div`
  width: 20rem;
  height: 23rem;
  padding: 3rem 1rem;
  border-radius: 1rem;
  margin: 0 auto;
  margin-top: 5rem;
  background-color: white;
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

export const validate = (type, value) => {
  return validInfo.rgx[type].test(value) ? true : false;
};

export const validInfo = {
  rgx: {
    email: /^.*(@).*/,
    password: /^.{8,}$/,
  },

  message: {
    email: "이메일은 @을 포함해야 합니다",
    password: "비밀번호는 8자 이상이어야 합니다",
  },
};

const validMsg = {
  email: "이메일은 @을 포함해야 합니다",
  password: "비밀번호는 8자 이상이어야 합니다",
};

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    email: { text: "", isValid: false },
    password: { text: "", isValid: false },
  });
  const [alert, setAlert] = useState({ email: "", password: "" });

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

    setUserInfo((prevInfo) => {
      const nextInfo = { ...prevInfo, [type]: { ...prevInfo[type], isValid } };
      return nextInfo;
    });
    if (isValid) {
      console.log("here");
      setAlert((prev) => ({ ...prev, [type]: "" }));
    } else {
      console.log("false");

      setAlert((prev) => ({ ...prev, [type]: validInfo.message[type] }));
    }
  };
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_WAS}/auth/signup`,
        {
          email: userInfo.email.text,
          password: userInfo.password.text,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(result);
      if (result.status === 201 && result.statusText === "Created") {
        navigate("/signin");
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

  const { email, password } = userInfo;

  return (
    <Container>
      <div className="header">
        {/* <img alt="logo"></img> */}
        <h1>pre-onboarding</h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          required
          data-testid="email-input"
          placeholder="이메일을 입력해 주세요"
          onChange={onChangeHandler}
          value={email.text}
        ></input>
        <div className="valid-msg">{email.text && alert.email}</div>
        <input
          type="password"
          required
          data-testid="password-input"
          placeholder="비밀번호를 입력해 주세요"
          onChange={onChangeHandler}
          value={password.text}
        ></input>
        <div className="valid-msg">{password.text && alert.password}</div>
        <button
          type="submit"
          data-testid="signup-button"
          disabled={!email.isValid || !password.isValid}
        >
          회원가입
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
