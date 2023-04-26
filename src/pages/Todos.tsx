import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';
import classes from './Todos.module.css';
import NewTodo from '../components/NewTodo';
import { TodoItemState } from '../types/todos';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todosApi';

// 권민영님
const Todos = () => {
  const [todoItems, setTodoItems] = useState<TodoItemState[]>([]);

  // 1.
  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodoItems(() => fetchedTodos);
    };
    fetchTodos();
  }, []);
  // 1.
  const onCreateTodo = async (todo: string) => {
    await createTodo(todo);
    const updatedTodos = await getTodos();
    setTodoItems(() => updatedTodos);
  };
  // 1.
  const onUpdateTodo = async (todoId: number, todoText: string, isCompleted: boolean) => {
    await updateTodo(todoId, todoText, isCompleted);
    const updatedTodos = await getTodos();
    setTodoItems(() => updatedTodos);
  };
  // 1.
  const onDeleteTodo = async (todoId: number) => {
    await deleteTodo(todoId);
    const updatedTodos = await getTodos();
    setTodoItems(updatedTodos);
  };

  return (
    <section>
      <h1 className={classes['todos-title']}> Todos</h1>
      <NewTodo createTodo={onCreateTodo} />
      <article>
        <ul className={classes.todos}>
          {todoItems &&
            todoItems.map((el) => (
              <TodoItem key={el.id} todoItem={el} onDelete={onDeleteTodo} onUpdate={onUpdateTodo} />
            ))}
        </ul>
      </article>
    </section>
  );
};

export default Todos;
