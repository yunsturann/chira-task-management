"use client";

// ** Nextjs Imports
import { useRouter } from "next/navigation";

// ** Types
import { IBoard } from "@/types/model.types";

interface RecentBoardItemProps {
  board: IBoard;
}

const RecentBoardItem = ({ board }: RecentBoardItemProps) => {
  const router = useRouter();

  const handleNavigateBoard = () => {
    router.push(`/todo/${board.name}`);
    router.refresh();
  };

  return (
    <li
      onClick={handleNavigateBoard}
      className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-900 bg-white hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-300 cursor-pointer"
    >
      {board.name}
    </li>
  );
};

export default RecentBoardItem;
