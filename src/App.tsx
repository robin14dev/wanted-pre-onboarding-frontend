import { Outlet, Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Todo from "./components/Todo";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import styled from "styled-components";

console.log("App");

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         path: "signup",
//         element: <Signup />,
//       },
//       {
//         path: "signin",
//         element: <Signin />,
//       },
//       {
//         path: "todo",
//         element: <Todo />,
//       },
//     ],
//   },
// ]);

const Wrapper = styled.div`
  height: 100%;
  /* background-color: yellow; */
  display: flex;
  flex-flow: column;
`;

const Main = styled.main`
  /* background-color: yellowgreen; */
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 3rem;
`;

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAuthState(true);
    }
  }, [authState]);
  return (
    <Wrapper>
      <BrowserRouter>
        <Header authState={authState} />
        <Main>
          <Routes>
            <Route path="signup" element={<Signup />} />
            <Route
              path="signin"
              element={<Signin setAuthState={setAuthState} />}
            />
            <Route path="todo" element={<Todo />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
