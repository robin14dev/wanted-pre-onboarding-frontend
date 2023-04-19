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
      <Link to={"/"}>Header</Link>
      <ul>
        <li>
          {!authState ? (
            <Link to={"signin"}>로그인</Link>
          ) : (
            <button onClick={signout}>로그아웃</button>
          )}
        </li>
      </ul>
    </Wrapper>
  );
}
