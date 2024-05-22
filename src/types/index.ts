declare type FormState = {
  message: string;
  error: boolean;
};

declare type IAddTodoByModal = {
  title: string;
  priority: string;
  status: string;
  description?: string;
  tags?: string;
};
