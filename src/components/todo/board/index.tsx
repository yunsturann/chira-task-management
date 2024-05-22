"use client";
// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Imports
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

// ** Types
import { ITodo, TodoStatus } from "@/types/model.types";

// ** Icons
import { FaPlus } from "react-icons/fa";

// ** Custom Components
import Column from "./Column";
import TodoFormModal from "../todo-form-modal";

interface BoardProps {
  boardTitle: string;
  tasks: ITodo[];
  userId: string;
}

const Board = (props: BoardProps) => {
  const { boardTitle, tasks, userId } = props;

  // ** States
  const [todos, setTodos] = useState<ITodo[]>(tasks);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);

  // const todoTasks = todos
  //   .filter((task) => task.status === TodoStatus.TODO)
  //   .map((task, index) => ({ ...task, index }));

  // const inProgressTasks = todos
  //   .filter((task) => task.status === TodoStatus.IN_PROGRESS)
  //   .map((task, index) => ({ ...task, index }));

  // const doneTasks = todos
  //   .filter((task) => task.status === TodoStatus.DONE)
  //   .map((task, index) => ({ ...task, index }));

  // console.log(todoTasks, inProgressTasks, doneTasks);

  // ** Add new todo handler
  const handleAddTodo = async (formData: IAddTodoByModal) => {
    const tags = formData.tags?.split(" ").map((tag) => tag.trim());

    const newTodo = {
      ...formData,
      tags,
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

      const data = await response.json();

      setTodos([...todos, data]);
      toast.success("Todo added successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // ** Drag and Drop Handler
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    // If the task is dropped outside the droppable area
    if (!destination) return;

    // If the task is dropped in the same column and same index
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find the dragged task
    const draggedTask = todos?.find((todo) => todo._id === draggableId);

    console.log(draggedTask);

    // Update the status of the dragged task
    let updatedStatus = destination.droppableId;

    // Update the status of the dragged task in the state
    const updatedTodos = todos.map((todo) => {
      if (todo._id === draggableId) {
        return {
          ...todo,
          status: updatedStatus,
        };
      }

      return todo;
    });

    setTodos(updatedTodos as ITodo[]);

    try {
      await fetch(`/api/todo/${draggedTask?._id}?status=${updatedStatus}`, {
        method: "PUT",
      });
    } catch (error) {
      toast.error("Failed to update task status");
      return;
    }
  };

  return (
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
            tasks={todos.filter((task) => task.status === TodoStatus.TODO)}
          />
          <Column
            title="In Progress"
            droppableId={TodoStatus.IN_PROGRESS}
            tasks={todos.filter(
              (tasks) => tasks.status === TodoStatus.IN_PROGRESS
            )}
          />
          <Column
            title="Done"
            droppableId={TodoStatus.DONE}
            tasks={todos.filter((tasks) => tasks.status === TodoStatus.DONE)}
          />
        </div>
      </DragDropContext>
      <TodoFormModal
        title="Add Todo"
        show={showAddTodoModal}
        setShow={setShowAddTodoModal}
        onSubmit={handleAddTodo}
      />
    </section>
  );
};

export default Board;
