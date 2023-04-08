import { useState, useEffect, useRef } from "react";
import TodoItems from "../components/TodoItems";

interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const Todos: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const newTodoRef = useRef<HTMLInputElement>(null);
  const getTodos = async () => {
    try {
      const response = await fetch(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          method: "get",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      } else {
        const fetchedData = await response.json();
        setTodoItems(() => fetchedData);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  const createTodo = async () => {
    try {
      const response = await fetch(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          method: "post",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({ todo: newTodoRef.current!.value }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
    } catch (error: any) {
      console.error(error.message);
    }
    newTodoRef.current!.value = "";

    getTodos();
  };
  const updateTodo = async (
    todoId: number,
    todoText: string,
    isCompleted: boolean
  ) => {
    try {
      const response = await fetch(
        `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`,
        {
          method: "put",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            todo: todoText,
            isCompleted: isCompleted,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
    } catch (error: any) {
      console.error(error.message);
    }
    getTodos();
  };

  const deleteTodo = async (todoId: number) => {
    try {
      const response = await fetch(
        `https://www.pre-onboarding-selection-task.shop/todos/${todoId}`,
        {
          method: "delete",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
    } catch (error: any) {
      console.error(error.message);
    }
    getTodos();
  };
  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = newTodoRef.current!.value;
    if (newTodo.trim() === "") return;
    createTodo();
  };

  console.log(todoItems);
  return (
    <section>
      <form onSubmit={todoSubmitHandler}>
        <input data-testid="new-todo-input" type="text" ref={newTodoRef} />
        <button data-testid="new-todo-add-button" type="submit">
          추가
        </button>
      </form>
      <article>
        {todoItems &&
          todoItems.map((el) => (
            <TodoItems
              key={el.id}
              todoItem={el}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
      </article>
    </section>
  );
};

export default Todos;
