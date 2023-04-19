import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { validMsg, checkValid } from "./validate";
import styled from "styled-components";

type FormProps = {
  type: "signin" | "signup";
  onError: null | string;
  isLoading: boolean;
  onSubmit: (email: string, password: string) => void;
};

const Wrapper = styled.form`
  display: flex;
  flex-flow: column;
  width: 20rem;
  height: 20rem;
  padding: 1rem;
  box-shadow: 1px 1px 6px lightgray;
  border-radius: 2rem;
  padding: 2rem;

  .title {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-bottom: 2rem;
    .bluebox {
      color: white;
      margin: 0 0.5rem;
      padding: 0.5rem;
      border-radius: 0.3rem;
      background-color: var(--mainBlue);
    }
    .highlight {
      color: var(--mainBlue);
      border-bottom: 2px solid;
      margin: 0 0.2rem;
      cursor: default;
    }
    h1 {
      color: var(--mainBlue);
    }
    h1,
    h2 {
      margin: 0;
    }
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
    background-color: var(--mainBlue);
    color: white;
    height: 2rem;
    border-radius: 0.2rem;
    font-weight: 600;
    &:disabled {
      background-color: lightgray;
    }
    position: relative;
  }

  .valid-msg {
    height: 1rem;
    margin: 0.2rem 0;
    font-size: 0.8rem;
  }

  .err-msg {
    height: 0.9rem;
    font-size: 0.8rem;
  }

  .change {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin-left: 1rem;
    }
  }
`;

export default function Form({
  type,
  onSubmit,
  onError,
  isLoading,
}: FormProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const [message, setMessage] = useState({
    email: validMsg.email,
    password: validMsg.password,
  });
  const [isChecking, setIsChecking] = useState(false);
  const [isError, setIsError] = useState(onError);
  const inputEmailRef = useRef<HTMLInputElement>(null);

  if (isError !== onError) {
    setIsError(onError);
  }

  const { email, password } = form;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkType = e.target.name as "email" | "password";
    const value = e.target.value;
    if (!isChecking) setIsChecking(true);

    setForm((prevForm) => ({
      ...prevForm,
      [checkType]: value,
    }));

    const validStatus = checkValid(checkType, value);
    setIsValid((prev) => ({ ...prev, [checkType]: validStatus }));
    !validStatus &&
      setMessage((prev) => ({ ...prev, [checkType]: validMsg[checkType] }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsChecking(false);
    onSubmit(email, password);
  };

  return (
    <Wrapper onSubmit={submitHandler}>
      <div className="title">
        <h1>Wanted</h1>
        <h2>pre-onboarding</h2>
      </div>
      <input
        placeholder="이메일을 입력해 주세요"
        type="text"
        name="email"
        data-testid="email-input"
        value={email}
        onChange={onChangeHandler}
        ref={inputEmailRef}
        spellCheck="false"
        disabled={isLoading}
        autoFocus={true}
      />
      <div className="valid-msg">
        {email && isChecking && !isValid.email && message.email}
      </div>
      <input
        placeholder="비밀번호를 입력해 주세요"
        type="password"
        name="password"
        data-testid="password-input"
        value={password}
        onChange={onChangeHandler}
        disabled={isLoading}
      />
      <div className="valid-msg">
        {password && !isValid.password && message.password}
      </div>
      <div className="err-msg">{!isLoading && !isChecking && isError}</div>
      <button
        type="submit"
        data-testid={`${type}-button`}
        disabled={!isValid.email || !isValid.password || isLoading}
      >
        {type === "signin" ? "로그인" : "회원가입"}
      </button>

      <div className="change">
        <p>
          {type === "signin"
            ? "아직 회원이 아니신가요?"
            : "이미 계정이 있으신가요?"}
        </p>
        <Link to={`/${type === "signin" ? "signup" : "signin"}`}>
          {type === "signin" ? "회원가입" : "로그인"}
        </Link>
      </div>
    </Wrapper>
  );
}
