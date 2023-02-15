import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import Header from "./components/Header";
import Main from "./components/Main";
function App() {
  const [userInfo, setUserInfo] = useState({ userId: null });
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
