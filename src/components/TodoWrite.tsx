import { String } from "aws-sdk/clients/cloudsearch";
import { useState } from "react";

type Props = {
  todoReducer: (
    type: "ADD" | "UPDATE" | "DELETE",
    payload: Todo | String
  ) => Promise<void>;
};

export default function TodoWrite({ todoReducer }: Props) {
  const [value, setValue] = useState("");
  const submitHandler = async () => {
    await todoReducer("ADD", value);
    setValue("");
  };

  return (
    <div>
      <input
        data-testid="new-todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={submitHandler} data-testid="new-todo-add-button">
        추가
      </button>
    </div>
  );
}
