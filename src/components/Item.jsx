import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Shimmer from "./Shimmer";

const List = styled.li`
  padding: 0.8rem 0.5rem;
  background-color: ${(props) =>
    props.isEdit ? "#bd84f6" : props.isCompleted ? "#9c0dd96f" : "whitesmoke"};
  opacity: ${(props) =>
    props.isCompleted && !props.isEdit ? 0.4 : props.isEdit ? 1 : null};
  border-radius: 0.5rem;
  display: flex;
  opacity: ${(props) => (props.isLoading ? 0.5 : null)};
  box-shadow: 0px 1px 3px lightgray;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  position: relative;
  filter: ${(props) => (props.isLoading ? "blur(0.5px)" : null)};
  cursor: pointer;
  & + & {
    margin-top: 0.4rem;
  }

  label {
    display: flex;
    margin-right: 1rem;
    cursor: pointer;
    flex: 1;
    input + p,
    input {
      margin-left: 0.5rem;
      color: ${(props) => (props.isEdit ? "white" : "black")};
      cursor: pointer;
    }

    p {
      word-wrap: break-word;
      word-break: break-all;
    }
  }

  input {
    background-color: transparent;
  }

  form {
    display: flex;
    width: 100%;
    justify-content: space-between;

    input {
      margin-left: 0.5rem;
      color: ${(props) => (props.isEdit ? "white" : "black")};
      & + input {
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }

  button {
    color: ${(props) => (props.isEdit ? "white" : "black")};

    & + button {
      margin-left: 0.4rem;
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.isEdit ? "#bd84f6" : props.isCompleted ? null : "#ebebeb"};
  }
`;

const Item = ({ todo, setTodos, setServerFail }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedTodo, setModifiedTodo] = useState(todo);
  const inputRef = useRef(null);

  const onChangeHandler = (e) => {
    e.stopPropagation();
    const type = e.target.type;
    const value = e.target.value;
    if (type === "checkbox") {
      setModifiedTodo((prevTodo) => ({
        ...prevTodo,
        isCompleted: !prevTodo.isCompleted,
      }));
    } else if (type === "text") {
      setModifiedTodo((prevTodo) => ({
        ...prevTodo,
        todo: value,
      }));
    }
  };
  const onSubmitHandler = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await axios.put(
        `${process.env.REACT_APP_WAS}/todos/${id}`,
        {
          todo: modifiedTodo.todo,
          isCompleted: modifiedTodo.isCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const { status, statusText, data } = result;
      if (status === 200 && statusText === "OK") {
        setModifiedTodo(data);
        setTodos((prevTodos) => {
          return prevTodos.map((prevTodo) => {
            return prevTodo.id === id ? data : prevTodo;
          });
        });
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error" && error.name === "AxiosError") {
        setServerFail(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    try {
      setIsLoading(true);
      console.log(modifiedTodo);
      const result = await axios.put(
        `${process.env.REACT_APP_WAS}/todos/${id}`,
        {
          todo: modifiedTodo.todo,
          isCompleted: !modifiedTodo.isCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const { status, statusText, data } = result;
      if (status === 200 && statusText === "OK") {
        setModifiedTodo(data);
        setTodos((prevTodos) =>
          prevTodos.map((prevTodo) => {
            return prevTodo.id === id ? data : prevTodo;
          })
        );
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error" && error.name === "AxiosError") {
        setServerFail(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
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
      if (error.message === "Network Error" && error.name === "AxiosError") {
        setServerFail(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <List
      key={todo.id}
      isEdit={isEdit}
      isCompleted={modifiedTodo.isCompleted}
      isLoading={isLoading}
    >
      {isEdit ? (
        <>
          <form onSubmit={(e) => onSubmitHandler(e, todo.id)}>
            <>
              <input
                spellCheck="false"
                type="checkbox"
                onChange={(e) => {
                  e.stopPropagation();
                  onChangeHandler(e);
                }}
                checked={modifiedTodo.isCompleted}
              />
              <input
                ref={inputRef}
                type="text"
                spellCheck="false"
                data-testid="modify-input"
                onChange={(e) => {
                  e.stopPropagation();
                  onChangeHandler(e);
                }}
                value={modifiedTodo.todo}
              />
            </>
            <span>
              <button data-testid="submit-button" type="submit">
                제출
              </button>
              <button
                data-testid="cancel-button"
                onClick={() => {
                  setIsEdit(!isEdit);
                  setModifiedTodo(todo);
                }}
              >
                취소
              </button>
            </span>
          </form>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleTodo(todo.id)}
              checked={modifiedTodo.isCompleted}
            ></input>
            <p>{modifiedTodo.todo}</p>
          </label>
          <span>
            <button
              data-testid="modify-button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(!isEdit);
              }}
            >
              수정
            </button>
            <button
              data-testid="delete-button"
              onClick={() => deleteTodo(modifiedTodo.id)}
            >
              삭제
            </button>
          </span>
        </>
      )}
      {isLoading && <Shimmer />}
    </List>
  );
};

export default Item;
