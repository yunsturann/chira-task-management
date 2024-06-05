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
import TodoFormModal from "../todo-form-modal";

import AlertDialog from "@/components/ui/AlertDialog";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";

const Chip = dynamic(() => import("@/components/ui/Chip"), {
  ssr: false,
});

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

  const handleUpdate = async (formData: ITodoByModal) => {
    try {
      const response = await fetch(`/api/todo/${task._id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await response.json();

      toast.success(data.message);

      if (formData.status === task.status) {
        setAllTodos({
          ...allTodos,
          [task.status]: allTodos[task.status].map((todo) =>
            todo._id === task._id ? data.updatedTodo : todo
          ),
        });
      } else {
        const updatedTodos = {
          ...allTodos,
          [task.status]: allTodos[task.status].filter(
            (todo) => todo._id !== task._id
          ),
        };

        updatedTodos[formData.status as TodoStatus].push(data.updatedTodo);

        setAllTodos(updatedTodos);
      }
      setShowUpdateTodoModal(false);
    } catch (error: any) {
      toast.error(error.message);
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
                <DropdownItem className="flex items-center justify-between">
                  Complete
                  <FaChevronRight />
                </DropdownItem>
              </Dropdown>
            </div>
            {/* Card Body */}
            <div className="space-y-2">
              <h3 className="font-medium">{task.title}</h3>
              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="flex gap-x-2">
                  {task.tags.map((tag, index) => (
                    <Chip key={index} color="random" className="rounded-lg">
                      {tag.tag}
                    </Chip>
                  ))}
                </div>
              )}

              {/* Date */}
              <p className="text-gray-400 text-xs">
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
          initialData={{
            id: task._id,
            title: task.title,
            priority: task.priority,
            status: task.status,
            description: task.description,
            tags: task.tags,
          }}
          onSubmit={handleUpdate}
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
