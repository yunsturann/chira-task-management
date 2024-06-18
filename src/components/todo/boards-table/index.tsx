"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** Custom Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import BoardFormModal from "./BoardFormModal";
import BoardItem from "./BoardItem";

// ** Types
import { IBoard } from "@/types/model.types";

interface BoardsTableProps {
  boards: IBoard[];
  userId: string;
}

const BoardsTable = (props: BoardsTableProps) => {
  const { boards, userId } = props;

  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ** Filter boards based on search query
  const filteredBoards = boards.filter((board) =>
    board.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 shadow-sm rounded-md">
      {/* header */}
      <div className="bg-slate-200 dark:bg-slate-500 flex flex-col md:flex-row justify-between gap-3 p-6 rounded-t-md">
        <Button
          color="dark"
          className="basis-1/3"
          onClick={() => setShowAddBoardModal(true)}
        >
          Create new board
        </Button>
        <div className="basis-1/3">
          <Input
            placeholder="Search boards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Board List */}
      <ul className="flex flex-col gap-y-3 p-6 h-[340px] sm:h-[500px] overflow-y-auto rounded-b-md">
        {filteredBoards.map((board) => (
          <BoardItem key={board._id} board={board} />
        ))}
      </ul>

      {/* Add Board Modal */}
      {showAddBoardModal && (
        <BoardFormModal
          onClose={() => setShowAddBoardModal(false)}
          title="Add new board"
          userId={userId}
        />
      )}
    </div>
  );
};

export default BoardsTable;
