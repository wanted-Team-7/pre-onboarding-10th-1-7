import { useState, useRef } from 'react';
import classes from './TodoItem.module.css';
import { isInputValid } from '../utils/validator';
import { TodoItemProps } from '../types/todos';

const TodoItem = ({ todoItem, onDelete, onUpdate }: TodoItemProps) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const newTodoRef = useRef<HTMLInputElement>(null);
  const todoText = todoItem.todo;
  const deleteTodoHandler = () => {
    onDelete(todoItem.id);
  };

  const updateTodoHandler = async () => {
    // setIsUpdate(() => true);
    const newTodo = newTodoRef.current?.value;
    if (isInputValid(newTodo)) return;
    await onUpdate(todoItem.id, newTodo, todoItem.isCompleted);
    setIsUpdate(() => false);
  };

  const todoCompleteHandler = () => {
    onUpdate(todoItem.id, todoItem.todo, !todoItem.isCompleted);
  };

  const handleToggle = () => {
    setIsUpdate(!isUpdate);
  };

  const todoContents = isUpdate ? (
    <>
      <input data-testid='modify-input' ref={newTodoRef} defaultValue={todoText} />
      <button type='button' data-testid='submit-button' onClick={updateTodoHandler}>
        제출
      </button>
      <button type='button' data-testid='delete-button' onClick={handleToggle}>
        취소
      </button>
    </>
  ) : (
    <>
      <span>{todoItem.todo}</span>
      <button type='button' data-testid='modify-button' onClick={handleToggle}>
        수정
      </button>
      <button type='button' data-testid='delete-button' onClick={deleteTodoHandler}>
        삭제
      </button>
    </>
  );
  return (
    <li className={classes.todo}>
      <label>
        <input
          type='checkbox'
          defaultChecked={todoItem.isCompleted}
          onClick={todoCompleteHandler}
        />
        {todoContents}
      </label>
    </li>
  );
};
export default TodoItem;
