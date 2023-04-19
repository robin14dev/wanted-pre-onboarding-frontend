import { useState } from "react";
import styled from "styled-components";
import { axiosCustom } from "../api/customAPI";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const Wrapper = styled.div`
  min-width: 18rem;
  display: flex;
  justify-content: space-between;

  input {
    border-radius: 6px;
    border: 1px solid lightgray;
    flex: 1;
    padding: 0.5rem;
  }

  button {
    margin-left: 1rem;
    background: var(--mainBlue);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 0.5rem;
    min-width: 4rem;
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
      width: 1rem;
      height: 1rem;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 4px solid var(--mainBlue);
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

export default function TodoWrite({ setTodos }: Props) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async () => {
    addTodo(value);
  };

  const addTodo = async (todo: string) => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return;
      setIsLoading(true);
      const createRes = await axiosCustom.post(
        "/todos",
        {
          todo,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      if (createRes.status === 201) {
        setTodos((prevTodos) => [...prevTodos, createRes.data]);
        setValue("");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <input
        placeholder="할일을 입력해 주세요"
        data-testid="new-todo-input"
        value={value}
        autoFocus={true}
        onChange={(e) => setValue(e.target.value)}
        spellCheck="false"
        disabled={isLoading}
      />
      <button
        className={isLoading ? "loading" : undefined}
        disabled={isLoading}
        onClick={submitHandler}
        data-testid="new-todo-add-button"
      >
        {!isLoading && "추가"}
      </button>
    </Wrapper>
  );
}
