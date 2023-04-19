import React from "react";

type Props = {
  // todosReducer: (
  //   type: "ADD" | "UPDATE" | "DELETE",
  //   payload: Todo
  // ) => Promise<void>;
  item: Todo;
};

export default function TodoItem({ item }: Props) {
  const { todo, isCompleted } = item;

  const completeTodo = () => {};

  return (
    <li>
      <label>
        <input type="checkbox" checked={isCompleted} onChange={completeTodo} />
        <span>{todo}</span>
      </label>
    </li>
  );
}
