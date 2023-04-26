import { useRef } from 'react';
import classes from './NewTodo.module.css';
import { NewTodoProps } from '../types/todos';

// 이지윤
const NewTodo = ({ createTodo }: NewTodoProps) => {
  const newTodoRef = useRef<HTMLInputElement>(null);

  // trim부분 추출 -> 가독성 좋게 이름 변경
  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = newTodoRef.current!.value;
    if (newTodo.trim() === '') return;
    createTodo(newTodo);
    newTodoRef.current!.value = '';
  };

  return (
    <form onSubmit={todoSubmitHandler} className={classes.form}>
      <input data-testid='new-todo-input' type='text' ref={newTodoRef} />
      <button data-testid='new-todo-add-button' type='submit'>
        추가
      </button>
    </form>
  );
};
export default NewTodo;
