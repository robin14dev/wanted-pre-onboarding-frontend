import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Item from "./Item";
const Container = styled.div`
  margin: auto;
  margin-top: 2rem;
  width: 20rem;
  box-shadow: 1px 1px 6px lightgray;
  border-radius: 0.5rem;
  padding: 1rem;
  & > form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    input {
      flex: 1;
      height: 2rem;
      border: 1px solid lightgray;
      border-radius: 0.4rem;
      padding-left: 0.5rem;
      margin-right: 0.5rem;
    }

    button {
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
      background-color: #9343e1;
      color: white;
    }

    & + .todo-list {
      margin-top: 1rem;
    }
  }

  .todo-list {
    ul {
      width: 100%;
    }
  }
`;

const Todo = () => {
  console.log("todo");
  const [todos, setTodos] = useState([]);
  const newTodoInputRef = useRef(null);
  const navigate = useNavigate();
  const newTodo = useRef();

  useEffect(() => {
    console.log("useEffect");
    if (!localStorage.getItem("access_token")) {
      console.log("here");
      navigate("/signin");
      return;
    }
    getTodos();

    newTodoInputRef.current.focus();
  }, []);

  const getTodos = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_WAS}/todos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const { status, statusText, data } = result;
      if (status === 200 && statusText === "OK") {
        setTodos(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_WAS}/todos`,
        {
          todo: newTodo.current,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { status, statusText, data } = result;
      if (status === 201 && statusText === "Created") {
        setTodos((prevTodos) => [...prevTodos, data]);
      }

      newTodo.current = "";
      newTodoInputRef.current.value = "";
      newTodoInputRef.current.focus();
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (e) => {
    newTodo.current = e.target.value;
  };

  const deleteTodo = async (id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_WAS}/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { status, statusText } = result;
      if (status === 204 && statusText === "No Content") {
        setTodos((prevTodos) => {
          return prevTodos.filter((todo) => todo.id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={createTodo}>
        <input
          spellCheck="false"
          ref={newTodoInputRef}
          onChange={onChangeHandler}
          data-testid="new-todo-input"
          type="text"
          placeholder="할일을 입력해 주세요"
        ></input>
        <button data-testid="new-todo-add-button" type="submit">
          추가
        </button>
      </form>

      <div className="todo-list">
        {todos.length > 0 && (
          <ul>
            {todos.map((todo) => (
              <Item
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                setTodos={setTodos}
              />
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default Todo;
