export interface TodoItemState {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface TodoItemsProps {
  todoItem: TodoItemState;
  onDelete: (id: number) => void;
  onUpdate: (id: number, todoText: string, isCompleted: boolean) => void;
}

export interface NewTodoProps {
  createTodo: (text: string) => void;
}
