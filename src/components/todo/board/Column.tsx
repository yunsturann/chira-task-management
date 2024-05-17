"use client";

// ** Types
import { ITodo } from "@/types/model.types";

// ** Icons
import { LuDot } from "react-icons/lu";
import { FaRocket } from "react-icons/fa";

// ** Third Party Imports
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { formatTimestamp } from "@/lib/utils";
import Chip from "@/components/ui/Chip";

interface ColumnProps {
  title: string;
  tasks: ITodo[];
  droppableId: string;
}

const Column = (props: ColumnProps) => {
  const { title, tasks, droppableId } = props;

  return (
    <div>
      {/* Header */}
      <header className="flex gap-1 mb-4">
        <h2 className="text-base uppercase font-semibold">{title}</h2>
        <LuDot />
      </header>
      {/* Column Body */}
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 space-y-3 shadow-md"
          >
            {tasks.map((task, index) => (
              <Draggable key={index} draggableId={task._id} index={index}>
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
                      {/* Actions Icon */}
                      <div
                        className="cursor-pointer text-xl text-blue-400 hover:text-blue-600 transition duration-300"
                        title="actions"
                      >
                        <FaRocket />
                      </div>
                    </div>
                    {/* Card Body */}
                    <div className="space-y-1">
                      <h3 className="font-medium">{task.title}</h3>
                      {/* Tags */}

                      {/* Date */}
                      <p className="text-gray-400 text-xs">
                        {formatTimestamp(task.createdAt, true)}
                      </p>
                    </div>

                    {/* Card Footer*/}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
