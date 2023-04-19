import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosCustom } from "../api/customAPI";
import TodoItem from "../components/TodoItem";
import TodoWrite from "../components/TodoWrite";
import { useNavigate } from "react-router-dom";

type Props = {};

const Wrapper = styled.div`
  height: fit-content;
  width: 20rem;
  border: 1px solid lightgray;
  border-radius: 2rem;
  padding: 2rem 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
`;
const TodoList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  padding: 0;
  min-width: 20rem;

  p {
    text-align: center;
  }
`;
export default function Todo({}: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();

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

  const todosReducer = async (
    type: "ADD" | "UPDATE" | "DELETE",
    payload: Todo | string | number
  ) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) return;
    switch (type) {
      case "ADD":
        try {
          const createRes = await axiosCustom.post(
            "/todos",
            {
              todo: payload,
            },
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          );
          if (createRes.status === 201) {
            setTodos((prevTodos) => [...prevTodos, createRes.data]);
          }
        } catch (error) {
        } finally {
        }

        return;

      case "DELETE":
        const id = payload;

        try {
          const deleteRes = await axiosCustom.delete(`/todos/${id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          if (deleteRes.status === 204) {
            setTodos((prev) => prev.filter((todo) => todo.id !== Number(id)));
          }
        } catch (error) {
        } finally {
        }

        return;

      default:
        return;
    }
  };

  useEffect(() => {
    console.log("todo useeffect!!");
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      return navigate("/signin");
    }

    getTodos();
  }, [navigate]);

  // if (!todos)
  //   return (
  //     <Wrapper>
  //       <TodoWrite />
  //     </Wrapper>
  //   );

  return (
    <Wrapper>
      <TodoWrite todoReducer={todosReducer} />
      <TodoList>
        {todos.length === 0 ? (
          <p>할일을 추가해 주세요</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              todosReducer={todosReducer}
              setTodos={setTodos}
            />
          ))
        )}
      </TodoList>
    </Wrapper>
  );
}
