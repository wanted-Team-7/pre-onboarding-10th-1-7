import { TodoItem } from '../types/todos';
import { TODO_BASE_URL } from './const';
import { fetchClient } from './fetchClient';

export const getTodos = async (): Promise<TodoItem[]> => {
  try {
    const response = await fetchClient(TODO_BASE_URL, {
      method: 'get',
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    const fetchedData = await response.json();
    return fetchedData;
  } catch (error: any) {
    console.error(error.message);
    return [];
  }
};

export const createTodo = async (todo: string): Promise<void> => {
  try {
    const response = await fetchClient(TODO_BASE_URL, {
      method: 'post',
      body: JSON.stringify({ todo }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateTodo = async (
  todoId: number,
  todoText: string,
  isCompleted: boolean
): Promise<void> => {
  try {
    const response = await fetchClient(`${TODO_BASE_URL}/${todoId}`, {
      method: 'put',
      body: JSON.stringify({
        todo: todoText,
        isCompleted,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteTodo = async (todoId: number): Promise<void> => {
  try {
    const response = await fetchClient(`${TODO_BASE_URL}/${todoId}`, {
      method: 'delete',
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
