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
import BoardFormModal from "./BoardFormModal";

// ** Actions
import { deleteBoardById } from "@/lib/actions/board.actions";

// Third Party Imports
import toast from "react-hot-toast";

interface BoardItemProps {
  board: IBoard;
}

const BoardItem = (props: BoardItemProps) => {
  const { board } = props;

  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteAlertDialog, setShowDeleteAlertDialog] = useState(false);
  const [showUpdateBoardModal, setShowUpdateBoardModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleNavigateToBoard = () => {
    router.push(`/todo/${board.name}`);
    router.refresh();
  };

  const handleDeleteBoard = async () => {
    setIsDeleting(true);

    const response = await deleteBoardById(board._id);

    setIsDeleting(false);

    if (response.error) return toast.error(response.message);

    toast.success(response.message);

    setShowDeleteAlertDialog(false);
  };

  return (
    <>
      <li className="flex flex-col sm:flex-row justify-between gap-x-4 rounded-lg border border-gray-300 dark:border-gray-900 bg-white dark:bg-gray-800">
        <h3
          className="flex-1 text-xl font-semibold tracking-tight p-3  hover:bg-slate-200  dark:hover:bg-gray-950 transition duration-300 cursor-pointer rounded-l-lg"
          onClick={handleNavigateToBoard}
        >
          {board.name}
        </h3>
        <div className="flex justify-between items-center gap-x-4">
          <p className="text-xs font-light">
            <span className="italic">Created: </span>
            {formatTimestamp(board.createdAt)}
          </p>

          <Dropdown
            isOpen={showDropdown}
            setIsOpen={setShowDropdown}
            iconSize={26}
            iconClassName="p-3 rounded-r-lg"
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
          isLoading={isDeleting}
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
