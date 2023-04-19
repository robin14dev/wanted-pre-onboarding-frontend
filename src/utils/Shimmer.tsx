import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: loading 2s infinite;

  .rotate {
    width: 50%;
    height: 100%;
    transform: skewX(-10deg);
    background: var(--mainBlue);
    filter: opacity(0.2);
  }

  @keyframes loading {
    0% {
      transform: translateX(-50%);
    }

    100% {
      transform: translateX(100%);
    }
  }
`;
export default function Shimmer() {
  return (
    <Wrapper>
      <div className="rotate"></div>
    </Wrapper>
  );
}
