import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { onInputRemoveSpecialChars } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface AddBoardModalProps extends ModalProps {
  userId: string;
}

const AddBoardModal = (props: AddBoardModalProps) => {
  const { userId, ...rest } = props;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal {...rest} innerClass="max-w-[600px]">
      <form className="flex flex-col gap-y-4 px-2 py-1" onSubmit={handleSubmit}>
        {/* Title */}
        <Input
          label={"Board Name"}
          placeholder="Enter board name..."
          necessary
          required
          onInput={onInputRemoveSpecialChars}
        />

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-x-12 gap-y-2 mt-4">
          <Button onClick={rest.onClose}>Close</Button>
          <Button color="blue" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBoardModal;
