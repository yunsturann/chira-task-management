// ** Types
import { IUser } from "@/types/model.types";

// ** Actions
import { getUserById } from "@/lib/actions/user.actions";

// ** Third Party Imports
import { auth } from "@clerk/nextjs";

// ** Custom Components
import Container from "@/components/shared/container";
import FirstTodoForm from "@/components/onboarding/first-todo-form";

const OnboardingPage = async () => {
  const { userId } = auth();

  const user: IUser = await getUserById(userId!);

  return (
    <div className="h-screen flex justify-center items-start">
      <Container className="max-w-[700px] relative top-[30%]">
        <h1 className="text-4xl lg:text-5xl font-semibold text-center mb-8">
          Hello {user.username} 👋
          <br /> Create your first todo!
        </h1>
        <FirstTodoForm userId={user._id} />
      </Container>
    </div>
  );
};

export default OnboardingPage;
