import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5rem;
  height: 4rem;
  border-bottom: 1px solid lightgray;
  background-color: white;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    h1 {
      font-size: 1.2rem;
    }
  }

  .account {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    button {
      & + button {
        margin-left: 2rem;
      }
    }

    .logout,
    .login {
      background-color: #9343e1;
      color: white;
      border-radius: 1rem;
      padding: 0.5rem 1rem;
      font-weight: 500;
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/signin");
  };

  return (
    <Container>
      <div className="logo" onClick={() => navigate("/")}>
        <h1>Wanted</h1>
      </div>
      <div className="account">
        {!localStorage.getItem("access_token") ? (
          <button className="login" onClick={() => navigate("/signin")}>
            로그인
          </button>
        ) : (
          <>
            <button className="todo" onClick={() => navigate("/todo")}>
              Todo
            </button>
            <button className="logout" onClick={logout}>
              로그아웃
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default Header;
