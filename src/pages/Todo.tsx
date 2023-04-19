import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosCustom } from "../api/customAPI";
import TodoItem from "../components/TodoItem";
import TodoWrite from "../components/TodoWrite";

type Props = {};

const Wrapper = styled.div``;
const TodoList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
`;
export default function Todo({}: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return;
      console.log("here");

      const getTodosRes = await axiosCustom.get("/todos", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      console.log(getTodosRes);
      if (getTodosRes.status === 200) {
        setTodos(getTodosRes.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  // const addTodo = async (todo: string) => {
  //   const access_token = localStorage.getItem("access_token");
  //   if (!access_token) return;

  //   const createdRes = await axiosCustom.post(
  //     "/todos",
  //     {
  //       todo,
  //     },
  //     {
  //       headers: { Authorization: `Bearer ${access_token}` },
  //     }
  //   );
  //   if (createdRes.status === 201) {
  //     setTodos((prevTodos) => [...prevTodos, createdRes.data]);
  //   }
  // };

  const todosReducer = async (
    type: "ADD" | "UPDATE" | "DELETE",
    payload: Todo | string
  ) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) return;
    switch (type) {
      case "ADD":
        const createdRes = await axiosCustom.post(
          "/todos",
          {
            todo: payload,
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        if (createdRes.status === 201) {
          setTodos((prevTodos) => [...prevTodos, createdRes.data]);
        }

        return;

      default:
        return;
    }
  };

  useEffect(() => {
    console.log("todo useeffect!!");

    getTodos();
  }, []);

  // if (!todos)
  //   return (
  //     <Wrapper>
  //       <TodoWrite />
  //     </Wrapper>
  //   );

  if (todos.length === 0)
    return (
      <Wrapper>
        <TodoWrite todoReducer={todosReducer} />
        할일을 추가해 주세요
      </Wrapper>
    );

  return (
    <Wrapper>
      <TodoWrite todoReducer={todosReducer} />
      <TodoList>
        {todos.length === 0
          ? "할일을 추가해 주세요"
          : todos.map((todo) => <TodoItem key={todo.id} item={todo} />)}
      </TodoList>
    </Wrapper>
  );
}
