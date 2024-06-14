"use client";

// ** React Imports
import { useEffect } from "react";
import { useFormState } from "react-dom";

// ** Next Imports
import { useRouter } from "next/navigation";

// ** Custom Components
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// ** Actions
import { createBoardWithFormData } from "@/lib/actions/board.actions";

// ** Third Party Imports
import toast from "react-hot-toast";
import { onInputRemoveSpecialChars } from "@/lib/utils";

interface FirstBoardFormProps {
  userId: string;
}

const initialState: TFormActionState = {
  message: "",
  error: false,
};

const FirstBoardForm = (props: FirstBoardFormProps) => {
  const { userId } = props;

  const router = useRouter();

  const [state, formAction] = useFormState(
    createBoardWithFormData,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.message);
    } else if (state.message) {
      toast.success(state.message);
      router.replace("/todo");
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <Input type="hidden" value={userId} name="userId" />
      <Input
        name="name"
        placeholder="Create your first board..."
        required
        maxLength={20}
        className="text-2xl mb-8"
        isUnderlined
        onInput={onInputRemoveSpecialChars}
      />
      <Button>Continue</Button>
    </form>
  );
};

export default FirstBoardForm;
