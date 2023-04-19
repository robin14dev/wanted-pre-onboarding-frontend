import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Todo from "./pages/Todo";

import styled from "styled-components";
import NotFound from "./pages/NotFound";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 3rem;
`;

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setAuthState(true);
    }
  }, [authState]);
  return (
    <Wrapper>
      <BrowserRouter>
        <Header authState={authState} />
        <Main>
          <Routes>
            <Route path="/" element={<Home authState={authState} />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="signin"
              element={<Signin setAuthState={setAuthState} />}
            />
            <Route path="todo" element={<Todo />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
