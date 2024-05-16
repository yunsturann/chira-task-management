declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string | null;
  lastName: string | null;
  username: string;
  photo: string;
};

declare type CreateTodoParams = {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  tags?: string[];
  status: "todo" | "in-progress" | "done";
  user: string;
};
