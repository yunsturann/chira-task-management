// ** React Imports
import React, { useState } from "react";

// ** Nextjs Imports
import { useRouter } from "next/navigation";

// ** Types
import { IBoard } from "@/types/model.types";

// ** Icons
import { FaEdit, FaLocationArrow, FaTrash } from "react-icons/fa";

// ** Utils
import { formatTimestamp } from "@/lib/utils";

// ** Custom Components
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import AlertDialog from "@/components/ui/AlertDialog";
import { deleteBoardById } from "@/lib/actions/board.actions";
import toast from "react-hot-toast";
import BoardFormModal from "./BoardFormModal";

interface BoardItemProps {
  board: IBoard;
}

const BoardItem = (props: BoardItemProps) => {
  const { board } = props;

  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteAlertDialog, setShowDeleteAlertDialog] = useState(false);
  const [showUpdateBoardModal, setShowUpdateBoardModal] = useState(false);

  const handleNavigateToBoard = () => {
    router.push(`/todo/${board.name}`);
    router.refresh();
  };

  const handleDeleteBoard = async () => {
    const response = await deleteBoardById(board._id);

    if (response.error) return toast.error(response.message);

    toast.success(response.message);
  };

  return (
    <>
      <li
        className="flex_between gap-x-4 p-3 rounded-lg border border-gray-300 dark:border-gray-900 bg-white hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-950 transition duration-300 cursor-pointer"
        onClick={handleNavigateToBoard}
      >
        <h3 className="text-xl font-semibold tracking-tight">{board.name}</h3>
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
            <DropdownItem
              className="flex_between"
              onClick={() => {
                setShowDeleteAlertDialog(true);
                setShowDropdown(false);
              }}
            >
              Delete <FaTrash />
            </DropdownItem>

            <DropdownItem
              className="flex_between"
              onClick={() => {
                setShowUpdateBoardModal(true);
                setShowDropdown(false);
              }}
            >
              Edit <FaEdit />
            </DropdownItem>

            <DropdownItem
              className="flex_between"
              onClick={handleNavigateToBoard}
            >
              Go to <FaLocationArrow />
            </DropdownItem>
          </Dropdown>
        </div>
      </li>
      {showDeleteAlertDialog && (
        <AlertDialog
          title={`Delete ${board.name}`}
          message="Are you sure you want to delete this board? This action cannot be undone."
          handleCancel={() => setShowDeleteAlertDialog(false)}
          handleContinue={handleDeleteBoard}
        />
      )}
      {showUpdateBoardModal && (
        <BoardFormModal
          title={`Update ${board.name}`}
          initialData={{
            name: board.name,
            boardId: board._id,
          }}
          onClose={() => setShowUpdateBoardModal(false)}
          userId={board.userId.toString()}
        />
      )}
    </>
  );
};

export default BoardItem;
