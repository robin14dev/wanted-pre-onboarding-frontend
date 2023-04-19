import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 3rem;
  background-color: rgb(2, 129, 254);
  display: flex;
  justify-content: space-between;
  padding: 0 0.5rem;
  color: white;
  align-items: center;

  a,
  button {
    color: white;
  }

  button {
    margin-left: 1rem;
  }
`;

type Props = {
  authState: boolean;
};

console.log("Header");

export default function Header({ authState }: Props) {
  const signout = () => {
    localStorage.removeItem("access_token");
    window.location.replace("/");
  };
  return (
    <Wrapper>
      <Link to={"/"}>Home</Link>
      <ul>
        <li>
          {!authState ? (
            <Link to={"signin"}>로그인</Link>
          ) : (
            <>
              <Link to={"todo"}>Todo</Link>
              <button onClick={signout}>로그아웃</button>
            </>
          )}
        </li>
      </ul>
    </Wrapper>
  );
}
