// ** Nextjs Imports
import Link from "next/link";

// ** Actions
import { getAllBoardsByUserId } from "@/lib/actions/board.actions";
import { getUserById } from "@/lib/actions/user.actions";

// ** Types
import { IBoard, IUser } from "@/types/model.types";

// ** Third Party Imports
import { auth } from "@clerk/nextjs";

// ** Custom Components
import Button from "@/components/ui/Button";
import RecentBoardItem from "./RecentBoardItem";
import Image from "next/image";

const RecentBoards = async () => {
  const { userId } = auth();

  // ** If user is not logged in
  if (!userId)
    return (
      <div className="flex items-center justify-center dark:bg">
        <Image
          priority={true}
          src={"/images/dark_board.png"}
          alt="dark board"
          width={900}
          height={700}
          quality={100}
          className="object-contain rounded-lg p-2 bg-slate-200 dark:bg-slate-500"
        />
      </div>
    );

  const user: IUser = await getUserById(userId!);

  // ** If user not found. There is an error with mongoDB
  if (!user) {
    return (
      <p className="text-red-400">
        User not found. Something went wrong with our servers. Please try again
        later.
      </p>
    );
  }

  const boards = (await getAllBoardsByUserId(user._id)) as IBoard[];

  // ** If user has no boards
  if (boards.length === 0) {
    return (
      <div className="w-full flex flex-col items-center gap-y-4 text-center">
        <p className="text-xl font-medium text-neutral-500 dark:text-neutral-300">
          {`You don't have any boards yet. Create your first board to start managing
          your todos.`}
        </p>
        <Link href="/onboarding">
          <Button color="dark" className="dark:border-white dark:bg-gray-700">
            Create First Board
          </Button>
        </Link>
      </div>
    );
  }

  // ** If user has boards
  return (
    <section>
      <h2 className="text-2xl font-medium mb-4">Recent Boards</h2>
      <ul className="flex flex-col gap-y-2">
        {boards.slice(0, 3).map((board) => (
          <RecentBoardItem key={board._id} board={board} />
        ))}
      </ul>
    </section>
  );
};

export default RecentBoards;
