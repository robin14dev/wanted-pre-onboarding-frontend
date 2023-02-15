import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: loading 2.5s infinite;

  .rotate {
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transform: skewX(-20deg);
    box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.2);
  }

  @keyframes loading {
    0% {
      transform: translateX(-150%);
    }
    50% {
      transform: translateX(-60%);
    }
    100% {
      transform: translateX(150%);
    }
  }
`;
const Shimmer = () => {
  return (
    <Wrapper>
      <div className="rotate"></div>
    </Wrapper>
  );
};

export default Shimmer;
