import React, { useState } from "react";
import { axiosCustom } from "../api/customAPI";
import styled from "styled-components";
import Shimmer from "../utils/Shimmer";
type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const StyledLi = styled.li`
  position: relative;
  overflow: hidden;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #ebebeb;
  }
  & + & {
    margin-bottom: 0.5rem;
  }

  label {
    flex: 1;
  }

  input[type="text"] {
    flex: 1;
    background: white;
    height: 2rem;
    margin-left: 0.2rem;
    padding-left: 0.4rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  span {
    margin-left: 0.4rem;
  }

  button {
    padding: 0.5rem;

    & + button {
      margin-left: 0.5rem;
    }
  }
`;

export default function TodoItem({ todo, setTodos }: Props) {
  const [item] = useState(todo);
  const text = item.todo;
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  const toggleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextItem = Object.assign(item, { isCompleted: e.target.checked });
    updateTodo(nextItem);
  };
  const modifyHandler = (item: Todo) => {
    const nextItem = Object.assign(item, { todo: editText });
    updateTodo(nextItem);
  };
  const cancelHandler = () => {
    setIsEdit(false);
    setEditText(text);
  };
  const deleteHandler = () => {
    deleteTodo(item.id);
  };

  const updateTodo = async (item: Todo) => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return;
      setIsLoading(true);
      const updateRes = await axiosCustom.put(
        `/todos/${item.id}`,
        {
          todo: item.todo,
          isCompleted: item.isCompleted,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      if (updateRes.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === item.id ? updateRes.data : todo))
        );
        setIsEdit(false);
      }
      return;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return;
      setIsLoading(true);
      const deleteRes = await axiosCustom.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (deleteRes.status === 204) {
        setTodos((prev) => prev.filter((todo) => todo.id !== Number(id)));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledLi>
      {isEdit ? (
        <>
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={toggleHandler}
          />
          <input
            autoFocus={true}
            type="text"
            value={editText}
            data-testid="modify-input"
            onChange={(e) => setEditText(e.target.value)}
            spellCheck="false"
          />
          <button
            disabled={isLoading}
            data-testid="submit-button"
            onClick={() => modifyHandler(item)}
          >
            제출
          </button>
          <button data-testid="cancel-button" onClick={cancelHandler}>
            취소
          </button>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={toggleHandler}
            />
            <span>{text}</span>
          </label>
          <button
            disabled={isLoading}
            data-testid="modify-button"
            onClick={() => setIsEdit(true)}
          >
            수정
          </button>
          <button
            disabled={isLoading}
            data-testid="delete-button"
            onClick={deleteHandler}
          >
            삭제
          </button>
        </>
      )}
      {isLoading && <Shimmer />}
    </StyledLi>
  );
}
