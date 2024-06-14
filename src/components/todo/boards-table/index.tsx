"use client";
// ** React Imports
import { useState } from "react";

// ** Nextjs Imports
import Link from "next/link";

// ** Custom Components
import Button from "@/components/ui/Button";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import AddBoardModal from "./AddBoardModal";

// ** Utils
import { formatTimestamp } from "@/lib/utils";

// ** Types
import { IBoard } from "@/types/model.types";

// ** Icons

import { FaEdit, FaLocationArrow, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface BoardsTableProps {
  boards: IBoard[];
  userId: string;
}

const BoardsTable = (props: BoardsTableProps) => {
  const { boards, userId } = props;

  const router = useRouter();

  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="border-2 border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 shadow-sm rounded-md">
      {/* header */}
      <div className="flex justify-between p-6">
        <Button
          color="blue"
          className="basis-1/3"
          onClick={() => setShowAddBoardModal(true)}
        >
          Create new board
        </Button>
        <div className="basis-1/3">
          <Input placeholder="Search boards..." />
        </div>
      </div>

      {/* Board List */}
      <ul className="flex flex-col gap-y-3 p-6 h-[500px] overflow-y-auto">
        {boards.map((board) => (
          // <Link key={board._id} href={`/todo/${board.name}`}>
          <li
            key={board._id}
            className="flex_between gap-x-4 p-3 rounded-lg border border-gray-300 dark:border-gray-900 bg-white dark:bg-gray-800 transition duration-300 cursor-pointer"
            onClick={() => {
              router.push(`/todo/${board.name}`);
              router.refresh();
            }}
          >
            <h3 className="text-xl font-semibold tracking-tight">
              {board.name}
            </h3>
            <div className="flex items-center gap-x-4">
              <p className="text-xs font-light">
                <span className="italic">Created: </span>
                {formatTimestamp(board.createdAt)}
              </p>

              <Dropdown
                isOpen={showDropdown}
                setIsOpen={setShowDropdown}
                iconSize={26}
              >
                <DropdownItem className="flex_between">
                  Edit <FaEdit />
                </DropdownItem>
                <DropdownItem className="flex_between">
                  Delete <FaTrash />
                </DropdownItem>
                <DropdownItem className="flex_between">
                  Go to <FaLocationArrow />
                </DropdownItem>
              </Dropdown>
            </div>
          </li>
          // </Link>
        ))}
      </ul>

      {/* Add Board Modal */}
      {showAddBoardModal && (
        <AddBoardModal
          onClose={() => setShowAddBoardModal(false)}
          title="Add new board"
          userId={userId}
        />
      )}
    </div>
  );
};

export default BoardsTable;
