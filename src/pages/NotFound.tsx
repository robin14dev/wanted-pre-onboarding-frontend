import { Link } from "react-router-dom";
import styled from "styled-components";

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
  .description {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    h2 {
      margin: 0;
    }
    a {
      color: var(--mainBlue);
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 0.5rem;
    }
    div {
      font-weight: bold;
    }
  }
`;

export default function NotFound() {
  return (
    <Wrapper>
      <h1>
        <span className="bluebox">NotFound</span>
      </h1>

      <div className="description">
        <h2>요청하신 페이지가 존재하지 않습니다.</h2>
        <div>
          <Link to="/">Home</Link>으로 돌아가기
        </div>
      </div>
    </Wrapper>
  );
}
