declare type TFormActionState = {
  message: string;
  error: boolean;
};

declare type ITodoByModal = {
  id?: string | undefined;
  description?: string | undefined;
  title: string;
  priority: string;
  status: string;
  tags?: {
    tag: string;
    color: string;
  }[];
};
