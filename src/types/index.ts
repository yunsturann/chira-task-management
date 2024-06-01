declare type TFormActionState = {
  message: string;
  error: boolean;
};

declare type ITodoByModal = {
  id?: string | undefined;
  description?: string | undefined;
  tags?: string | undefined;
  title: string;
  priority: string;
  status: string;
};
