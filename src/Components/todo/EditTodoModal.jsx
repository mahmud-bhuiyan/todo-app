import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatDueToDisplay } from "../../utils/DisplayDate";
import { toast } from "react-toastify";
import { updateTodoById } from "../../services/api/Todo";

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
            <label
              htmlFor="dueDate"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Status
            </label>
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

export default EditTodoModal;
