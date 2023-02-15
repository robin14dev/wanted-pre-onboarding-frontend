import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import Header from "./components/Header";
import Main from "./components/Main";
import ServerFail from "./components/ServerFail";
import { useState } from "react";
function App() {
  const [serverFail, setServerFail] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        {serverFail && <ServerFail setServerFail={setServerFail} />}
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={<Signup setServerFail={setServerFail} />}
          />
          <Route
            path="/signin"
            element={<Signin setServerFail={setServerFail} />}
          />
          <Route
            path="/todo"
            element={<Todo setServerFail={setServerFail} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
