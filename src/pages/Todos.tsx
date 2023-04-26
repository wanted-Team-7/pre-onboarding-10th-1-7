import { useState, useEffect } from 'react';
import TodoItems from '../components/TodoItems';
import classes from './Todos.module.css';
import NewTodo from '../components/NewTodo';
import { TodoItem } from '../types/todos';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todosApi';

const Todos = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodoItems(() => fetchedTodos);
    };
    fetchTodos();
  }, []);

  const onCreateTodo = async (todo: string) => {
    await createTodo(todo);
    const updatedTodos = await getTodos();
    setTodoItems(() => updatedTodos);
  };

  const onUpdateTodo = async (todoId: number, todoText: string, isCompleted: boolean) => {
    await updateTodo(todoId, todoText, isCompleted);
    const updatedTodos = await getTodos();
    setTodoItems(() => updatedTodos);
  };

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
              <TodoItems
                key={el.id}
                todoItem={el}
                onDelete={onDeleteTodo}
                onUpdate={onUpdateTodo}
              />
            ))}
        </ul>
      </article>
    </section>
  );
};

export default Todos;
