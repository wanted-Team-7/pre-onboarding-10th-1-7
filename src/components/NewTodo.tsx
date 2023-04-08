import { useRef } from "react";
import classes from "./NewTodo.module.css";
const NewTodo = (props: any) => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = newTodoRef.current!.value;
    if (newTodo.trim() === "") return;
    props.createTodo(newTodo);
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
