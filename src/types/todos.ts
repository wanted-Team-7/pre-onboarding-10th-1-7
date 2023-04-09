export interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface TodoItemsProps {
  todoItem: TodoItem;
  onDelete: (id: number) => void;
  onUpdate: (id: number, todoText: string, isCompleted: boolean) => void;
}

export interface TodoItem {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
