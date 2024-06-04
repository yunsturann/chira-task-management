"use client";
import React, { useContext, useRef, useState } from "react";

// ** Icons
import { FaRocket } from "react-icons/fa";

// ** Types
import { ITodo, ITodoResponse, TodoStatus } from "@/types/model.types";

// ** Third Party Imports
import { Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

// ** Custom Components
import Chip from "@/components/ui/Chip";

// ** Hooks
import useClickOutside from "@/hooks/use-click-outside";

// ** Utils
import { formatTimestamp } from "@/lib/utils";
import TodoFormModal from "../todo-form-modal";
import { ITodoContext, TodoContext } from "@/context/all-todos-context";

interface TodoItemProps {
  task: ITodo;
  index: number;
}

const TodoItem = (props: TodoItemProps) => {
  const { task, index } = props;

  // ** States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUpdateTodoModal, setShowUpdateTodoModal] = useState(false);

  // ** Context
  const { setTodos: setAllTodos, todos: allTodos } =
    useContext<ITodoContext>(TodoContext);

  // ** Refs
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const handleDelete = async () => {
    // if (!confirm("Are you sure you want to delete this task?")) return;
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
              <Chip priorityType={task.priority} title="priority">
                {task.priority}
              </Chip>
              {/* Actions */}
              <div className="relative">
                {/* Actions Icon */}
                <div
                  className="cursor-pointer text-xl text-blue-400 hover:text-blue-600 transition duration-300"
                  title="actions"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <FaRocket />
                </div>
                {/* Actions Items */}
                {isDropdownOpen && (
                  <ul
                    className="absolute z-50 top-full mt-2 right-0 w-40 bg-white dark:bg-gray-500 border border-gray-400 shadow-lg p-1.5 rounded-lg space-y-1.5 text-sm tracking-tight"
                    ref={dropdownRef}
                  >
                    <li
                      className="p-2 hover:bg-slate-200 hover:text-blue-400 dark:hover:bg-white rounded-md cursor-pointer transition"
                      onClick={handleDelete}
                    >
                      Delete
                    </li>
                    <li
                      className="p-2 hover:bg-slate-200 hover:text-blue-400 dark:hover:bg-white rounded-md cursor-pointer transition"
                      onClick={handleUpdateState}
                    >
                      Update
                    </li>
                    <li className="p-2 hover:bg-slate-200 hover:text-blue-400 dark:hover:bg-white rounded-md cursor-pointer transition">
                      Complete
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {/* Card Body */}
            <div className="space-y-2">
              <h3 className="font-medium">{task.title}</h3>
              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="flex gap-x-2">
                  {task.tags.map((tag, index) => (
                    <Chip key={index} className="rounded-lg">
                      {tag}
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
            tags: task.tags.length > 0 ? task.tags.join(" ") + " " : "",
          }}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
};

export default TodoItem;
