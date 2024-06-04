"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Imports
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

// ** Types
import {
  ITodo,
  ITodoResponse,
  ITodoStatusIndexRequest,
  TodoStatus,
} from "@/types/model.types";

// ** Icons
import { FaPlus } from "react-icons/fa";

// ** Custom Components
import Column from "./Column";
import TodoFormModal from "../todo-form-modal";

// ** Context
import { TodoContext } from "@/context/all-todos-context";

interface BoardProps {
  boardTitle: string;
  tasks: ITodoResponse;
  userId: string;
}

const Board = (props: BoardProps) => {
  const { boardTitle, tasks, userId } = props;

  // ** States
  const [todos, setTodos] = useState<ITodoResponse>(tasks);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);

  // ** Add new todo handler
  const handleAddTodo = async (formData: ITodoByModal) => {
    const newTodo = {
      ...formData,
      user: userId,
    };

    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const data: ITodo = await response.json();

      setTodos({
        ...todos,
        [data.status]: [...todos[data.status], data],
      });

      toast.success("Todo added successfully");

      setShowAddTodoModal(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // ** Drag and Drop Handler
  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    // If the task is dropped outside the droppable area
    if (!destination) return;

    // If the task is dropped in the same column and same index
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find the dragged task
    const draggedTask = todos[source.droppableId as TodoStatus][source.index];

    let updatedTodos: ITodoStatusIndexRequest[] = [];

    // If the task is dropped in the same column
    if (source.droppableId === destination.droppableId) {
      const newTodos = todos[source.droppableId as TodoStatus];

      // Remove the task from the source index
      newTodos.splice(source.index, 1);

      // Add the task to the destination index
      newTodos.splice(destination.index, 0, draggedTask);

      setTodos({
        ...todos,
        [source.droppableId as TodoStatus]: newTodos,
      });

      // Update the index of all the tasks in the same column
      newTodos.forEach((task, index) => {
        updatedTodos.push({
          _id: task._id,
          status: source.droppableId as TodoStatus,
          index,
        });
      });
    } else {
      const sourceTodos = todos[source.droppableId as TodoStatus];
      const destinationTodos = todos[destination.droppableId as TodoStatus];

      // remove the task from the source column
      sourceTodos.splice(source.index, 1);

      // Update the status of the dragged task
      draggedTask.status = destination.droppableId as TodoStatus;

      // add the task to the destination column
      destinationTodos.splice(destination.index, 0, draggedTask);

      setTodos({
        ...todos,
        [source.droppableId as TodoStatus]: sourceTodos || [],
        [destination.droppableId as TodoStatus]: destinationTodos || [],
      });

      // Update the index of all the tasks in the source column
      sourceTodos.forEach((task, index) => {
        updatedTodos.push({
          _id: task._id,
          status: source.droppableId as TodoStatus,
          index,
        });
      });

      destinationTodos.forEach((task, index) => {
        updatedTodos.push({
          _id: task._id,
          status: destination.droppableId as TodoStatus,
          index,
        });
      });
    }

    // Update the task status in the database
    try {
      await fetch(`/api/todo`, {
        method: "PUT",
        body: JSON.stringify(updatedTodos),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      toast.error("Failed to update task status");
      return;
    }
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <section>
        <h1 className="text-3xl font-bold tracking-tighter text-center mb-10">
          {boardTitle}
        </h1>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Add new todo Button */}
          <button
            className="fixed bottom-[3%] right-[3%] lg:bottom-[5%] lg:right-[5%] size-12 bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xl rounded-full shadow-md shadow-gray-600 flex items-center justify-center hover:opacity-80 transition duration-300"
            title="Add New Todo"
            onClick={() => setShowAddTodoModal(true)}
          >
            <FaPlus />
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            <Column
              title="Todo"
              droppableId={TodoStatus.TODO}
              tasks={todos.todo}
            />
            <Column
              title="In Progress"
              droppableId={TodoStatus.IN_PROGRESS}
              tasks={todos.in_progress}
            />
            <Column
              title="Done"
              droppableId={TodoStatus.DONE}
              tasks={todos.done}
            />
          </div>
        </DragDropContext>
        {/* Add Todo Modal */}
        {showAddTodoModal && (
          <TodoFormModal
            title="Add Todo"
            onClose={() => setShowAddTodoModal(false)}
            onSubmit={handleAddTodo}
          />
        )}
      </section>
    </TodoContext.Provider>
  );
};

export default Board;
