// ** Nextjs Imports
import { redirect } from "next/navigation";
import { Metadata } from "next";

// ** Types
import { IUser } from "@/types/model.types";

// ** Actions
import { getUserById } from "@/lib/actions/user.actions";

// ** Third Party Imports
import { auth } from "@clerk/nextjs";

// ** Custom Components
import Container from "@/components/shared/container";
import FirstBoardForm from "@/components/onboarding/first-board-form";

export const metadata: Metadata = {
  title: "Onboarding",
};

const OnboardingPage = async () => {
  const { userId } = auth();

  const user: IUser = await getUserById(userId!);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="h-screen flex justify-center items-start">
      <Container className="max-w-[700px] relative top-[30%]">
        <h1 className="text-4xl lg:text-5xl font-semibold text-center mb-8">
          Hello {user.username} 👋
          <br /> Create your first board!
        </h1>
        <FirstBoardForm userId={user._id} />
      </Container>
    </div>
  );
};

export default OnboardingPage;
