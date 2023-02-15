import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const List = styled.li`
  padding: 0.8rem 0.5rem;
  background-color: ${(props) =>
    props.isEdit ? "#bd84f6" : props.isCompleted ? "#9c0dd96f" : "whitesmoke"};
  opacity: ${(props) =>
    props.isCompleted && !props.isEdit ? "40%" : props.isEdit ? 1 : null};
  border-radius: 0.5rem;
  display: flex;
  box-shadow: 0px 1px 3px lightgray;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;

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
      /* flex: 1; */
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

const Item = ({ todo, deleteTodo, setTodos }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [modifiedTodo, setModifiedTodo] = useState(todo);
  const inputRef = useRef(null);

  const onChangeHandler = (e) => {
    console.log(e);
    console.log("edit!!");
    e.stopPropagation();
    const type = e.target.type;
    const value = e.target.value;
    if (type === "checkbox") {
      console.log("here");
      console.log(modifiedTodo);
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
    console.log(modifiedTodo);
  };
  const onSubmitHandler = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("reerr");
    try {
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
      console.log(result);
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
    }
  };

  const toggleTodo = async (id) => {
    // e.stopPropagation();
    try {
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
      console.log(result);
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
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      console.log(inputRef.current);
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <List
      isEdit={isEdit}
      isCompleted={modifiedTodo.isCompleted}
      key={todo.id}
      // onClick={(e) => toggleTodo(e, todo.id)}
    >
      {isEdit ? (
        <>
          <form onSubmit={(e) => onSubmitHandler(e, todo.id)}>
            <>
              <input
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
                onClick={(e) => {
                  // e.stopPropagation();
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
    </List>
  );
};

export default Item;
