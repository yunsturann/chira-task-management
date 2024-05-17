"use client";

import Button from "@/components/ui/Button";
// ** Custom Components
import Input from "@/components/ui/Input";
import Modal, { ModalProps } from "@/components/ui/Modal";
import SelectBox from "@/components/ui/SelectBox";
import TextArea from "@/components/ui/TextArea";

// ** Constants
import { todoStatusArray } from "@/constants";

// ** Third Party Imports
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface TodoModalProps extends ModalProps {
  onSubmit: (data: any) => void;
}

const TodoFormModal = (props: TodoModalProps) => {
  const { onSubmit, ...rest } = props;

  const { register, handleSubmit } = useForm();

  return (
    <Modal {...rest} innerClass="max-w-[600px]">
      <form
        className="flex flex-col gap-y-4 px-2 py-1 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <Input
          {...register("title")}
          label={"Title"}
          placeholder="Enter title ..."
          necessary
        />
        {/* Priority */}
        <SelectBox
          {...register("priority")}
          label="Priority"
          options={todoStatusArray}
          necessary
        />

        {/* Description */}
        <TextArea
          {...register("description")}
          label="Description"
          rows={7}
          placeholder="Enter description ..."
        />

        {/* Tags */}
        <Input
          {...register("tags")}
          label={"Tags"}
          placeholder="Enter tags ..."
        />

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-x-12 gap-y-2 mt-4">
          <Button onClick={() => rest.setShow(false)}>Close</Button>
          <Button color="blue" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TodoFormModal;
