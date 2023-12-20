import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createTodo } from "../services/api/Todo";
import { useState } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setNewTodo(true);

    // Extracting only the date part
    const dateOnly = data.dueDate.split("T")[0];

    const todoData = {
      title: data.title,
      description: data.description,
      dueDate: dateOnly,
    };

    try {
      const response = await createTodo(todoData);

      if (response && response.todo._id !== "") {
        setNewTodo(false);
        document.getElementById("custom_modal").close();
        toast.success(response.message);
        reset();
      }
    } catch (error) {
      document.getElementById("custom_modal").close();
      reset();
      toast.error(error);
    } finally {
      setNewTodo(false);
    }
  };

  const handleCloseModal = () => {
    document.getElementById("custom_modal").close();
    reset();
  };

  return (
    <>
      <div className="text-center py-3 md:py-5 mb-3 bg-white rounded">
        <h3 className="text-sm sm:text-base md:text-xl mb-2">Todo List</h3>
        <button
          className="btn btn-sm btn-accent text-white"
          onClick={() => document.getElementById("custom_modal").showModal()}
        >
          Create Todo
        </button>
      </div>
      <div>
        <dialog id="custom_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create Todo</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-4">
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
              <div className="py-4">
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
                  <span className="text-red-500 text-sm ">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="py-4">
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
                  {...register("dueDate", {
                    required: "Due Date is required",
                  })}
                />
                {errors.dueDate && (
                  <span className="text-red-500 text-sm">
                    {errors.dueDate.message}
                  </span>
                )}
              </div>
              <div className="modal-action">
                <button type="submit" className="btn" disabled={newTodo}>
                  {newTodo ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    "Add Task"
                  )}
                </button>
                <button
                  type="button"
                  className="btn ml-2"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default TodoList;
