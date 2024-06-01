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
import { createTodoWithFormData } from "@/lib/actions/todo.actions";

// ** Enums & Types
import { TodoPriority } from "@/types/model.types";

// ** Third Party Imports
import toast from "react-hot-toast";

interface FirstTodoFormProps {
  userId: string;
}

const initialState: TFormActionState = {
  message: "",
  error: false,
};

const FirstTodoForm = (props: FirstTodoFormProps) => {
  const { userId } = props;
  console.log(userId);

  const router = useRouter();

  const [state, formAction] = useFormState(
    createTodoWithFormData,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.message);
    } else if (state.message) {
      toast.success(state.message);
      router.replace("todo");
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <Input type="hidden" value={userId} name="userId" />
      <Input type="hidden" value={TodoPriority.LOW} name="priority" />
      <Input
        isUnderlined
        placeholder="Enter your first todo..."
        className="text-2xl mb-8"
        required
        type="text"
        name="title"
      />
      <Button>Continue</Button>
    </form>
  );
};

export default FirstTodoForm;
