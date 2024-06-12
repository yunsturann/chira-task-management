"use client";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
// ** Icons
import { FaChevronRight, FaRocket, FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

// ** Types
import { ITodo, TodoStatus } from "@/types/model.types";

// ** Third Party Imports
import { Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

// ** Utils
import { formatTimestamp } from "@/lib/utils";

// ** Context
import { ITodoContext, TodoContext } from "@/context/all-todos-context";

// ** Custom Components
import TodoFormModal, { TodoFormType } from "../todo-form-modal";
import AlertDialog from "@/components/ui/AlertDialog";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import Chip from "@/components/ui/Chip";

interface TodoItemProps {
  task: ITodo;
  index: number;
}

const TodoItem = (props: TodoItemProps) => {
  const { task, index } = props;

  // ** States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUpdateTodoModal, setShowUpdateTodoModal] = useState(false);
  const [showDeleteAlertDialog, setShowDeleteAlertDialog] = useState(false);

  // ** Context
  const { setTodos: setAllTodos, todos: allTodos } =
    useContext<ITodoContext>(TodoContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/todo/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      toast.success(data.message);

      setAllTodos((prev) => ({
        ...prev,
        [task.status]: prev[task.status].filter(
          (todo) => todo._id !== task._id
        ),
        length: prev.length - 1,
      }));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdateState = () => {
    setShowUpdateTodoModal(true);
    setIsDropdownOpen(false);
  };

  const handleCompleteTodo = async () => {
    if (task.status === TodoStatus.DONE)
      return toast.error("Task already completed");

    setIsDropdownOpen(false);

    const formData: TodoFormType = {
      title: task.title,
      description: task.description,
      status:
        task.status === TodoStatus.IN_PROGRESS
          ? TodoStatus.DONE
          : TodoStatus.IN_PROGRESS,
      priority: task.priority,
    };

    try {
      const response = await fetch(`/api/todo/${task!._id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formData,
          tags: task.tags,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await response.json();

      toast.success(data.message);

      const updatedTodos = {
        ...allTodos,
        [task!.status]: allTodos[task!.status].filter(
          (todo) => todo._id !== task!._id
        ),
      };

      updatedTodos[formData.status as TodoStatus].push(data.updatedTodo);

      setAllTodos(updatedTodos);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="p-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white text-black dark:bg-gray-600 dark:text-white "
          >
            {/* Card Header*/}
            <div className="flex justify-between items-center mb-2">
              <Chip color={task.priority} title="priority">
                {task.priority}
              </Chip>
              {/* Actions */}
              <Dropdown
                actionIcon={<FaRocket />}
                isOpen={isDropdownOpen}
                setIsOpen={setIsDropdownOpen}
              >
                <DropdownItem
                  onClick={() => {
                    setShowDeleteAlertDialog(true);
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center justify-between"
                >
                  Delete <FaTrash />
                </DropdownItem>
                <DropdownItem
                  onClick={handleUpdateState}
                  className="flex items-center justify-between"
                >
                  Update <GrUpdate />
                </DropdownItem>
                <DropdownItem
                  onClick={handleCompleteTodo}
                  className="flex items-center justify-between"
                >
                  Complete
                  <FaChevronRight />
                </DropdownItem>
              </Dropdown>
            </div>
            {/* Card Body */}
            <div>
              <h3 className="font-medium">{task.title}</h3>
              {/* Description */}
              {task.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {task.description}
                </p>
              )}
              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
                  {task.tags.map(({ color, tag }, index) => (
                    <Chip
                      key={index}
                      className="rounded-lg"
                      style={{ background: color }}
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}

              {/* Date */}
              <p className="text-gray-400 text-xs mt-2">
                {formatTimestamp(task.createdAt, true)}
              </p>
            </div>

            {/* Card Footer*/}
          </div>
        )}
      </Draggable>
      {/* Update Todo Modal */}
      {showUpdateTodoModal && (
        <TodoFormModal
          title="Update Todo"
          onClose={() => setShowUpdateTodoModal(false)}
          task={task}
        />
      )}
      {/* Delete Alert Dialog */}
      {showDeleteAlertDialog && (
        <AlertDialog
          title="Are you absolutely sure?"
          message="This action cannot be undone. This will permanently delete your todo from our servers."
          handleCancel={() => setShowDeleteAlertDialog(false)}
          handleContinue={handleDelete}
        />
      )}
    </>
  );
};

export default TodoItem;
