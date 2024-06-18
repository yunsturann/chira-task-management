"use client";
// ** React Imports
import React, { useState } from "react";

// ** Custom Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal, { ModalProps } from "@/components/ui/Modal";

// ** Utils
import { onInputRemoveSpecialChars } from "@/lib/utils";

// ** Actions
import {
  createBoardWithModal,
  updateBoardById,
} from "@/lib/actions/board.actions";

// ** Third Party Imports
import toast from "react-hot-toast";

interface AddBoardModalProps extends ModalProps {
  userId: string;
  initialData?: {
    name: string;
    boardId: string;
  };
}

const BoardFormModal = (props: AddBoardModalProps) => {
  const { userId, initialData, ...rest } = props;

  const IS_EDIT_MODE = initialData !== undefined;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Escape") {
      rest.onClose();
    }
  };

  const handleAddBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = new FormData(e.currentTarget).get("name") as string;

    if (name.length < 3) {
      return toast.error("Board name must be at least 3 characters long");
    }

    setIsSubmitting(true);

    const response = await createBoardWithModal(userId, name);

    setIsSubmitting(false);

    if (response.error) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    rest.onClose();
  };

  const handleUpdateBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = new FormData(e.currentTarget).get("name") as string;

    if (name.length < 3) {
      return toast.error("Board name must be at least 3 characters long");
    }

    setIsSubmitting(true);

    const response = await updateBoardById(initialData!.boardId, name);

    setIsSubmitting(false);

    if (response.error) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    rest.onClose();
  };

  return (
    <Modal {...rest} innerClass="max-w-[600px]">
      <form
        className="flex-1 flex flex-col justify-between gap-y-4 px-2 py-1"
        onSubmit={IS_EDIT_MODE ? handleUpdateBoard : handleAddBoard}
        onKeyDown={handleKeyDown}
      >
        {/* Title */}
        <Input
          name="name"
          label={"Board Name"}
          placeholder="Enter board name..."
          defaultValue={initialData?.name}
          maxLength={20}
          necessary
          required
          onInput={onInputRemoveSpecialChars}
        />

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-x-12 gap-y-2 mt-4">
          <Button type="button" onClick={rest.onClose}>
            Close
          </Button>
          <Button color="blue" type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BoardFormModal;
