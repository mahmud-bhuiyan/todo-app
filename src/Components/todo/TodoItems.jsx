import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/FormatDate";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { deleteTodo, updateTodoById } from "../../services/api/Todo";
import { TodoContext } from "../../Context/TodoContext";
import Swal from "sweetalert2";
import { getDynamicBackgroundColor } from "../DynamicCardBGColor";
import { formatDueToDisplay } from "../../utils/DisplayDate";

const EditTodoModal = ({ isOpen, onClose, todo, onEdit }) => {
  const [newTodo, setNewTodo] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Check if any field has changed
      if (
        data.title === todo.title &&
        data.description === todo.description &&
        data.dueDate === formatDueToDisplay(todo.dueDate) &&
        data.status === todo.status
      ) {
        // No changes, show a message and return
        toast.info("No changes to update.");
        onClose();
        return;
      }

      setNewTodo(true);

      const editedTodoData = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: data.status,
      };

      const response = await updateTodoById(todo._id, editedTodoData);

      if (response && response.todo._id !== "") {
        onEdit(response.todo);
        toast.success(response.message);
        onClose();
        setNewTodo(false);
      }
    } catch (error) {
      toast.error("An error occurred!");
      console.log(error);
    }
  };

  // Set default values when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setValue("title", todo.title);
      setValue("description", todo.description);
      setValue("dueDate", formatDueToDisplay(todo.dueDate));
      setValue("status", todo.status);
    }
  }, [isOpen, setValue, todo]);
  console.log(todo);

  return (
    <dialog
      id="custom_modal"
      open={isOpen}
      className={`modal ${isOpen ? "block" : "hidden"}`}
    >
      <div className="modal-box p-4 mx-auto my-20 bg-white rounded-md shadow-md max-w-md">
        <h3 className="font-bold text-lg">Edit Todo</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-2">
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="body-large mb-0 flex h-10 w-full rounded-md border border-input bg-[#F6F2F7] px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#78767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[#C8C5CA] disabled:cursor-not-allowed disabled:opacity-50"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="pt-2">
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              className="body-large mb-0 flex h-20 w-full rounded-md border border-input bg-[#F6F2F7] px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#78767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[#C8C5CA] disabled:cursor-not-allowed disabled:opacity-50"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Due Date */}
          <div className="pt-2">
            <label
              htmlFor="dueDate"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="body-large mb-0 flex h-10 w-full rounded-md border border-input bg-[#F6F2F7] px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#78767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[#C8C5CA] disabled:cursor-not-allowed disabled:opacity-50"
              {...register("dueDate", { required: "Due Date is required" })}
            />
            {errors.dueDate && (
              <span className="text-red-500 text-sm">
                {errors.dueDate.message}
              </span>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-600">Status:</label>
            <select
              className="body-large mb-0 flex h-10 w-full rounded-md border border-input bg-[#F6F2F7] px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#78767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[#C8C5CA] disabled:cursor-not-allowed disabled:opacity-50"
              {...register("status", {
                required: "Status is required",
              })}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && (
              <span className="text-red-500">{errors.status.message}</span>
            )}
          </div>

          <div className="modal-action">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800 text-sm"
              disabled={newTodo}
            >
              {newTodo ? (
                <>
                  <span className="loading loading-spinner text-info"></span>
                  <span className="loading loading-spinner text-success"></span>
                  <span className="loading loading-spinner text-warning"></span>
                  <span className="loading loading-spinner text-error"></span>
                </>
              ) : (
                "Update Todo"
              )}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800 text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

const TodoItems = ({ todo, index }) => {
  const { _id, title, description, dueDate, status } = todo;
  console.log("Due Date:", todo.dueDate);
  const { setTodos } = useContext(TodoContext);
  const [actionTodo, setActionTodo] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
          setActionTodo(true);
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
