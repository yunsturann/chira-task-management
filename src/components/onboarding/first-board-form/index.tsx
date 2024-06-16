"use client";

import { useState } from "react";
// ** Next Imports
import { useRouter } from "next/navigation";

// ** Custom Components
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// ** Actions
import { createBoardWithModal } from "@/lib/actions/board.actions";

// ** Third Party Imports
import toast from "react-hot-toast";

// ** Utils
import { onInputRemoveSpecialChars } from "@/lib/utils";

interface FirstBoardFormProps {
  userId: string;
}

const FirstBoardForm = (props: FirstBoardFormProps) => {
  const { userId } = props;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateFirstBoard = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsLoading(true);

    const name = new FormData(e.currentTarget).get("name") as string;

    const response = await createBoardWithModal(userId, name);

    if (response.error) {
      setIsLoading(false);
      return toast.error(response.message);
    }

    toast.success("First board created successfully");
    router.push("/todo/" + name);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleCreateFirstBoard}>
      <Input
        name="name"
        placeholder="Create your first board..."
        required
        minLength={3}
        maxLength={20}
        className="text-2xl mb-8"
        isUnderlined
        onInput={onInputRemoveSpecialChars}
      />
      <Button type="submit" disabled={isLoading}>
        Continue
      </Button>
    </form>
  );
};

export default FirstBoardForm;
