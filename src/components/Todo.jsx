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
  }

  .todo-list {
    margin-top: 1rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    .empty {
      color: gray;
    }
    ul {
      width: 100%;
    }
    & > div {
      position: relative;
    }
  }

  .loading {
    position: relative;
    span {
      visibility: hidden;
      opacity: 0.5;
      transition: all 0.2s;
    }

    &::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 4px solid #9343e1;
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }

    @keyframes button-loading-spinner {
      from {
        transform: rotate(0turn);
      }

      to {
        transform: rotate(1turn);
      }
    }
  }
`;

const Todo = ({ setServerFail }) => {
  const [todos, setTodos] = useState([]);
  const newTodoInputRef = useRef(null);
  const navigate = useNavigate();
  const newTodo = useRef(null);
  const [isLoading, setIsLoading] = useState({
    getTodos: false,
    createTodo: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
      return;
    }
    getTodos();

    newTodoInputRef.current.focus();
  }, []);

  const getTodos = async () => {
    try {
      setIsLoading((prevLoading) => ({ ...prevLoading, getTodos: true }));
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
      if (error.message === "Network Error" && error.name === "AxiosError") {
        setServerFail(true);
      }
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, getTodos: false }));
    }
  };
  const createTodo = async (e) => {
    e.preventDefault();
    if (newTodoInputRef.current.value.length === 0) return;
    try {
      setIsLoading((prevLoading) => ({ ...prevLoading, createTodo: true }));
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
    } catch (error) {
      if (error.message === "Network Error" && error.name === "AxiosError") {
        setServerFail(true);
      }
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, createTodo: false }));
      setTimeout(() => {
        if (newTodoInputRef.current) {
          newTodoInputRef.current.focus();
        }
      }, 0);
    }
  };

  const onChangeHandler = (e) => {
    newTodo.current = e.target.value;
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
          disabled={isLoading.createTodo}
        />
        <button
          data-testid="new-todo-add-button"
          type="submit"
          className={isLoading.createTodo ? "loading" : undefined}
        >
          <span>추가</span>
        </button>
      </form>

      <div className="todo-list">
        {isLoading.getTodos && todos.length === 0 && (
          <div className={isLoading.getTodos ? "loading" : undefined}>
            <span></span>
          </div>
        )}
        {!isLoading.getTodos && todos.length === 0 && (
          <p className="empty">할일 목록이 비어있습니다</p>
        )}
        {!isLoading.getTodos && todos.length > 0 && (
          <ul>
            {todos.map((todo) => (
              <Item
                setServerFail={setServerFail}
                key={todo.id}
                todo={todo}
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
