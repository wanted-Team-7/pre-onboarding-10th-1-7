import { useState, useRef } from 'react';
import classes from './TodoItem.module.css';
import { TodoItemsProps } from '../types/todos';

// 이지윤
// todoItems -> todoItem
const TodoItems = ({ todoItem, onDelete, onUpdate }: TodoItemsProps) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const newTodoRef = useRef<HTMLInputElement>(null);
  const todoText = todoItem.todo;
  const deleteTodoHandler = () => {
    onDelete(todoItem.id);
  };
  const updateTodoHandler = () => {
    setIsUpdate(() => true);
    const newTodo = newTodoRef.current?.value;
    // 2.
    if (!newTodo || newTodo.trim().length === 0) return;
    onUpdate(todoItem.id, newTodo, todoItem.isCompleted);
    setIsUpdate(() => false);
  };
  const todoCompleteHandler = () => {
    onUpdate(todoItem.id, todoItem.todo, !todoItem.isCompleted);
  };

  // const = handleToggle = () => {}...

  const todoContents = isUpdate ? (
    <>
      <input data-testid='modify-input' ref={newTodoRef} defaultValue={todoText} />
      <button type='button' data-testid='submit-button' onClick={updateTodoHandler}>
        제출
      </button>
      {/* handleToggle */}
      <button type='button' data-testid='delete-button' onClick={() => setIsUpdate(false)}>
        취소
      </button>
    </>
  ) : (
    <>
      <span>{todoItem.todo}</span>
      {/* handleToggle */}
      <button type='button' data-testid='modify-button' onClick={updateTodoHandler}>
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
export default TodoItems;
