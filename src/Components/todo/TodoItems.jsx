import { formatDate } from "../../utils/FormatDate";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { deleteTodo } from "../../services/api/Todo";
import { useContext, useState } from "react";
import { TodoContext } from "../../Context/TodoContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const TodoItems = ({ todo, index }) => {
  const { _id, title, description, dueDate, status } = todo;

  const { setTodos } = useContext(TodoContext);
  const [isOpen, setIsOpen] = useState(false);

  // const handleToggleCollapse = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleDelete = async (todoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteTodo(todoId);

          // when deletion is successful, update the state
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo._id !== todoId)
          );
          toast.success(response.message);
        } catch (error) {
          toast.error("An error occurred!");
          console.log(error);
        }
      }
    });
  };

  const getDynamicBackgroundColor = (index) => {
    const colors = [
      "bg-green-200",
      "bg-yellow-200",
      "bg-pink-200",
      "bg-purple-200",
      "bg-orange-200",
      "bg-red-200",
      "bg-teal-200",
      "bg-indigo-200",
      "bg-gray-200",
    ];
    return colors[index % colors.length];
  };

  return (
    <div
      className={`w-full shadow-md rounded-md 
      ${getDynamicBackgroundColor(index)}`}
    >
      <div className="p-3">
        <div className="flex gap-2 justify-between items-center">
          <h1 className="text-base font-semibold overflow-hidden text-ellipsis">
            {title}
          </h1>
          <span className="flex gap-2">
            <FaEdit
              // onClick={handleEdit}
              className="cursor-pointer mb-2"
            />
            <FaRegTrashAlt
              onClick={() => handleDelete(_id)}
              className="cursor-pointer"
            />
          </span>
        </div>
        <p className="text-sm mt-3 h-10 overflow-hidden">
          {description.length > 30
            ? `${description.slice(0, 160)}...`
            : description}
        </p>
        <div className="flex justify-between">
          <h3 className="text-sm mt-2">Due: {formatDate(dueDate)}</h3>
          <h4>
            {status === "Pending" && (
              <span className="badge badge-warning sm:ml-2 text-sm">
                {status}
              </span>
            )}
            {status === "Processing" && (
              <span className="text-sm badge badge-info ml-2">{status}</span>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TodoItems;
