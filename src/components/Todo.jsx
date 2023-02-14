import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      console.log("here");
      navigate("/signin");
    }
  }, []);

  return <div>TODO</div>;
};

export default Todo;
