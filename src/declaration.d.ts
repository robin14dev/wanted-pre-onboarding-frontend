type Todo = {
  id: number;
  userId: number;
  todo: string;
  isCompleted: boolean;
};

type TodoReducer = (
  type: "ADD" | "UPDATE" | "DELETE",
  payload: Todo | string | number
) => Promise<void>;
