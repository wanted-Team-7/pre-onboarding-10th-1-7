import { useRef } from "react";
import classes from "./NewTodo.module.css";
import { NewTodoProps } from "../types/todos";

const NewTodo = ({ createTodo }: NewTodoProps) => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = newTodoRef.current!.value;
    if (newTodo.trim() === "") return;
    createTodo(newTodo);
    newTodoRef.current!.value = "";
  };

  return (
    <form onSubmit={todoSubmitHandler} className={classes.form}>
      <input data-testid="new-todo-input" type="text" ref={newTodoRef} />
      <button data-testid="new-todo-add-button" type="submit">
        추가
      </button>
    </form>
  );
};
export default NewTodo;
