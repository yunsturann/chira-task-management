"use client";
// ** React Imports
import { useState } from "react";

// ** Third Party Imports
import { DragDropContext } from "@hello-pangea/dnd";

// ** Custom Components
import Column from "./Column";

// ** Types
import { ITodo, TodoStatus } from "@/types/model.types";

// ** Icons
import { FaPlus } from "react-icons/fa";
import TodoFormModal from "../todo-form-modal";

interface BoardProps {
  boardTitle: string;
  tasks: ITodo[];
}

const Board = (props: BoardProps) => {
  const { boardTitle, tasks } = props;

  // ** States
  const [showAddTodoModal, setShowAddTodoModal] = useState(true);

  const onDragEnd = () => {};

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
            droppableId="todo"
            tasks={tasks.filter((task) => task.status === TodoStatus.TODO)}
          />
          <Column
            title="In Progress"
            droppableId="in-progress"
            tasks={tasks.filter(
              (task) => task.status === TodoStatus.IN_PROGRESS
            )}
          />
          <Column
            title="Done"
            droppableId="done"
            tasks={tasks.filter((task) => task.status === TodoStatus.DONE)}
          />
        </div>
      </DragDropContext>
      <TodoFormModal
        title="Add Todo"
        show={showAddTodoModal}
        setShow={setShowAddTodoModal}
        onSubmit={() => {}}
      />
    </section>
  );
};

export default Board;
