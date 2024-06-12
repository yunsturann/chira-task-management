"use client";

// ** Custom Components
import Input from "@/components/ui/Input";
import Modal, { ModalProps } from "@/components/ui/Modal";
import SelectBox from "@/components/ui/SelectBox";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import InputTags, { ITag } from "@/components/ui/InputTags";

// ** Constants
import { todoPriorityArray, todoStatusArray } from "@/constants";

// ** Third Party Imports
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Utils
import { onInputRemoveSpecialChars } from "@/lib/utils";
import { useContext, useState } from "react";

// ** Context
import { ITodoContext, TodoContext } from "@/context/all-todos-context";
import toast from "react-hot-toast";
import { ITodo, TodoStatus } from "@/types/model.types";

// ** Props
interface TodoModalProps extends ModalProps {
  task?: ITodo;
}

// ** Form Validation Schema
const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(50, "Max 50 characters")
    .min(3, "Min 3 characters"),
  priority: yup
    .string()
    // .oneOf(Object.values(TodoPriority), "Invalid priority")
    .required("Priority is required"),
  status: yup.string().required("Status is required"),
  description: yup.string().max(255, "Max 255 characters"),
});

export type TodoFormType = yup.InferType<typeof schema>;

const TodoFormModal = (props: TodoModalProps) => {
  const { task, ...rest } = props;

  let initialFormData = {
    title: "",
    description: "",
    priority: "low",
    status: TodoStatus.TODO,
  };

  // ** States
  const [tags, setTags] = useState<ITag[]>(task?.tags || []);

  // ** Context
  const { setTodos, todos, userId } = useContext<ITodoContext>(TodoContext);

  const IS_ADD_MODE = task === undefined;

  if (!IS_ADD_MODE) {
    initialFormData = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status as TodoStatus,
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver<TodoFormType>(schema),
    defaultValues: initialFormData,
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // ** Add new todo handler
  const handleAddTodo = async (formData: ITodoByModal) => {
    const newTodo = {
      ...formData,
      tags,
      user: userId,
    };

    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const data: ITodo = await response.json();

      setTodos({
        ...todos,
        [data.status]: [...todos[data.status], data],
      });

      toast.success("Todo added successfully");

      rest.onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdateTodo = async (formData: ITodoByModal) => {
    try {
      const response = await fetch(`/api/todo/${task!._id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formData,
          tags,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await response.json();

      toast.success(data.message);

      if (formData.status === task!.status) {
        setTodos({
          ...todos,
          [task!.status]: todos[task!.status].map((todo) =>
            todo._id === task!._id ? data.updatedTodo : todo
          ),
        });
      } else {
        const updatedTodos = {
          ...todos,
          [task!.status]: todos[task!.status].filter(
            (todo) => todo._id !== task!._id
          ),
        };

        updatedTodos[formData.status as TodoStatus].push(data.updatedTodo);

        setTodos(updatedTodos);
      }
      rest.onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Modal {...rest} innerClass="max-w-[600px]">
      <form
        className="flex flex-col gap-y-4 px-2 py-1"
        onSubmit={handleSubmit(IS_ADD_MODE ? handleAddTodo : handleUpdateTodo)}
        onKeyDown={handleKeyPress}
      >
        {/* Title */}
        <Input
          {...register("title")}
          label={"Title"}
          placeholder="Enter title..."
          necessary
          error={errors.title?.message}
          onInput={onInputRemoveSpecialChars}
        />
        {/* Priority */}
        <SelectBox
          {...register("priority")}
          label="Priority"
          options={todoPriorityArray}
          necessary
          error={errors.priority?.message}
        />

        {/* Status */}
        <SelectBox
          {...register("status")}
          label="Status"
          options={todoStatusArray}
          necessary
          error={errors.status?.message}
        />

        {/* Description */}
        <TextArea
          {...register("description")}
          label="Description"
          rows={5}
          placeholder="Enter description..."
          error={errors.description?.message}
        />

        {/* Tags */}
        <InputTags tags={tags} setTags={setTags} />

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-x-12 gap-y-2 mt-4">
          <Button onClick={rest.onClose}>Close</Button>
          <Button color="blue" type="submit" disabled={isSubmitting}>
            {IS_ADD_MODE
              ? isSubmitting
                ? "Adding..."
                : "Add"
              : isSubmitting
              ? "Updating..."
              : "Update"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoFormModal;
