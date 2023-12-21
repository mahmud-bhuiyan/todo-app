import { useContext, useState } from "react";
import { formatDate } from "../../utils/FormatDate";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { TodoContext } from "../../Context/TodoContext";
import { getDynamicBackgroundColor } from "../DynamicCardBGColor";
import EditTodoModal from "./EditTodoModal";

const TodoItems = ({ todo, index }) => {
  const { _id, title, description, dueDate, status } = todo;

  const { setTodos } = useContext(TodoContext);
  const [actionTodo, setActionTodo] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { handleDelete } = useContext(TodoContext);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div
        className={`w-full shadow-md rounded-md 
      ${getDynamicBackgroundColor(index)}`}
      >
        <div className="p-3">
          <h1 className="text-base font-bold overflow-hidden text-ellipsis uppercase">
            {title}
          </h1>

          <p className="text-sm text-slate-600 mt-1 h-10 overflow-hidden">
            {description.length > 30
              ? `${description.slice(0, 160)}...`
              : description}
          </p>
          <div className="flex justify-between">
            <h3 className="text-sm text-slate-600 mt-2">
              Due: {formatDate(dueDate)}
            </h3>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <h4>
              {status === "Pending" && (
                <span className="text-sm text-slate-700 badge badge-warning">
                  {status}
                </span>
              )}
              {status === "Processing" && (
                <span className="text-sm text-slate-700 badge badge-info">
                  {status}
                </span>
              )}
              {status === "Completed" && (
                <span className="text-sm text-slate-700 badge badge-success">
                  {status}
                </span>
              )}
            </h4>
            <span className="flex gap-2 pt-3">
              {actionTodo ? (
                <>
                  <span className="loading loading-dots loading-lg"></span>
                </>
              ) : (
                <>
                  <FaEdit
                    onClick={() => handleEdit()}
                    className="cursor-pointer text-[16px] mb-2"
                  />
                  <FaRegTrashAlt
                    onClick={() => handleDelete(_id)}
                    className="cursor-pointer text-[16px]"
                  />
                </>
              )}
            </span>
            {/* Edit Todo Modal */}
            <EditTodoModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              todo={todo}
              onEdit={(editedTodo) => {
                setTodos((prevTodos) =>
                  prevTodos.map((t) =>
                    t._id === editedTodo._id ? editedTodo : t
                  )
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItems;
