import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = { authState: boolean };
const Wrapper = styled.div`
  display: flex;
  height: 20rem;
  justify-content: center;
  align-items: center;
  .bluebox {
    color: white;
    margin: 0 0.5rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    background-color: var(--mainBlue);
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    margin-left: 1rem;
    .highlight {
      color: var(--mainBlue);
      border-bottom: 2px solid;
      margin: 0 0.2rem;
      cursor: default;
    }
  }
`;
export default function Home({ authState }: Props) {
  return (
    <Wrapper>
      {!authState ? (
        <>
          <h1>
            <Link to={"/signin"}>
              <span className="bluebox">로그인</span>
            </Link>
            후,
          </h1>

          <h2>
            <span className="highlight">할일 관리 서비스</span>를 이용해 보세요.
          </h2>
        </>
      ) : (
        <>
          <h1>안녕하세요,</h1>
          <h2>
            상단의<span className="bluebox"> Todo</span>를 클릭해 보세요.
          </h2>
        </>
      )}
    </Wrapper>
  );
}
