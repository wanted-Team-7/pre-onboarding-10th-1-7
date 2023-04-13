import { TodoItem } from "../types/todos";
import { getToken } from "../utils/token";

const baseUrl = "https://www.pre-onboarding-selection-task.shop/todos";

export const getTodos = async (): Promise<TodoItem[]> => {
  try {
    const response = await fetch(baseUrl, {
      method: "get",
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
    const response = await fetch(baseUrl, {
      method: "post",
      headers: {
        authorization: `Bearer ${getToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ todo: todo }),
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
    const response = await fetch(`${baseUrl}/${todoId}`, {
      method: "put",
      headers: {
        authorization: `Bearer ${getToken()}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        todo: todoText,
        isCompleted: isCompleted,
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
    const response = await fetch(`${baseUrl}/${todoId}`, {
      method: "delete",
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
