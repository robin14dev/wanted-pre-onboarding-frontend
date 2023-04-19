import { String } from "aws-sdk/clients/cloudsearch";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  todoReducer: (
    type: "ADD" | "UPDATE" | "DELETE",
    payload: Todo | String
  ) => Promise<void>;
};

const Wrapper = styled.div`
  min-width: 18rem;
  /* background: yellow; */
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
  }
`;

export default function TodoWrite({ todoReducer }: Props) {
  const [value, setValue] = useState("");
  const submitHandler = async () => {
    await todoReducer("ADD", value);
    setValue("");
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
      />
      <button onClick={submitHandler} data-testid="new-todo-add-button">
        추가
      </button>
    </Wrapper>
  );
}
