import { useRef } from "react";

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
    <form onSubmit={todoSubmitHandler}>
      <input data-testid="new-todo-input" type="text" ref={newTodoRef} />
      <button data-testid="new-todo-add-button" type="submit">
        추가
      </button>
    </form>
  );
};
export default NewTodo;
