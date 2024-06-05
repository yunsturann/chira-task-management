"use client";

// ** Custom Components
import Input from "@/components/ui/Input";
import Modal, { ModalProps } from "@/components/ui/Modal";
import SelectBox from "@/components/ui/SelectBox";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import InputTags from "@/components/ui/InputTags";

// ** Constants
import { todoPriorityArray, todoStatusArray } from "@/constants";

// ** Third Party Imports
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Utils
import { onInputRemoveSpecialChars } from "@/lib/utils";

// ** Props
interface TodoModalProps extends ModalProps {
  onSubmit: (data: ITodoByModal) => void;
  initialData?: ITodoByModal;
}

// ** Form Validation Schema
const schema = yup.object().shape({
  id: yup.string().optional(),
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
  tags: yup
    .array()
    .of(
      yup.object().shape({
        tag: yup.string().required("Tag is required"),
        color: yup.string().required("Color is required"),
      })
    )
    .optional(),
});

const TodoFormModal = (props: TodoModalProps) => {
  const { onSubmit, initialData, ...rest } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <Modal {...rest} innerClass="max-w-[600px]">
      <form
        className="flex flex-col gap-y-4 px-2 py-1"
        onSubmit={handleSubmit(onSubmit)}
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
          rows={7}
          placeholder="Enter description..."
          error={errors.description?.message}
        />

        {/* Tags */}

        <InputTags
          label={"Tag"}
          placeholder="Enter #tags..."
          setValue={setValue}
          initialTags={initialData?.tags}
        />

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-x-12 gap-y-2 mt-4">
          <Button onClick={rest.onClose}>Close</Button>
          <Button color="blue" type="submit" disabled={isSubmitting}>
            {initialData ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoFormModal;
