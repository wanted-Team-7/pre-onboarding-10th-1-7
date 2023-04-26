import { TodoItemState } from '../types/todos';
import { getToken } from '../utils/token';
import { TODO_BASE_URL } from './const';

// fetchClient 따로 빼기
export const getTodos = async (): Promise<TodoItemState[]> => {
  try {
    const response = await fetch(TODO_BASE_URL, {
      method: 'get',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
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
    const response = await fetch(TODO_BASE_URL, {
      method: 'post',
      headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-type': 'application/json',
      },
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
    const response = await fetch(`${TODO_BASE_URL}/${todoId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-type': 'application/json',
      },
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
    const response = await fetch(`${TODO_BASE_URL}/${todoId}`, {
      method: 'delete',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
