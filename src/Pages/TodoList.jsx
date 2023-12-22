import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createTodo } from "../services/api/Todo";
import { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import Loader from "../Components/Loader";
import TodoItems from "../Components/todo/TodoItems";
import CustomFormInput from "../Components/todo/CustomFormInput";
import { Helmet } from "react-helmet-async";

const TodoList = () => {
  const { todos, setTodos, loading } = useContext(TodoContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState(false);
  const [sortOption, setSortOption] = useState("Sort By Created DESC");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // create todo functionality
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

        // Update the state with the new todo
        setTodos((prevTodos) => [...prevTodos, response.todo]);

        setIsModalOpen(false);
        toast.success(response.message);
        reset();
      }
    } catch (error) {
      setIsModalOpen(false);
      toast.error(error);
      reset();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // Sorting function based on the selected option
  const sortTodos = (option) => {
    switch (option) {
      case "Sort By Created ASC":
        return [...todos].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "Sort By Created DESC":
        return [...todos].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "Sort By Due Date ASC":
        return [...todos].sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
      case "Sort By Due Date DESC":
        return [...todos].sort(
          (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
        );
      default:
        return todos;
    }
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | DailyDocket</title>
      </Helmet>
      <div>
        <div className="text-center py-3 md:py-5 mb-3 bg-white rounded">
          <h3 className="text-sm sm:text-base md:text-xl mb-2">Todo List</h3>
          <button
            className="btn btn-sm btn-accent text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Create Todo
          </button>
        </div>
        <select
          className="select select-bordered select-sm w-full max-w-[200px] mb-2"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="Sort By Created ASC">Sort By Created ASC</option>
          <option value="Sort By Created DESC">Sort By Created DESC</option>
          <option value="Sort By Due Date ASC">Sort By Due Date ASC</option>
          <option value="Sort By Due Date DESC">Sort By Due Date DESC</option>
        </select>
      </div>

      {loading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-x-auto">
          {sortTodos(sortOption)
            .filter((todo) => todo.status !== "Completed")
            .map((todo, index) => (
              <TodoItems key={todo._id} todo={todo} index={index} />
            ))}
        </div>
      )}

      {/* create todo */}
      <dialog id="custom_modal" open={isModalOpen} className="modal">
        <div className="modal-box p-4 mx-auto my-20 bg-white rounded-md shadow-md max-w-md">
          <h3 className="font-bold text-lg">Create Todo</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomFormInput
              label="Title"
              type="text"
              id="title"
              register={register}
              name="title"
              error={errors.title}
              maxLength={50}
              placeholder="Enter title here"
            />

            <CustomFormInput
              label="Description"
              type="textarea"
              id="description"
              register={register}
              name="description"
              error={errors.description}
              maxLength={100}
              placeholder="Enter description here"
            />

            <CustomFormInput
              label="Due Date"
              type="date"
              id="dueDate"
              register={register}
              name="dueDate"
              error={errors.dueDate}
            />

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
                  "Add New Todo"
                )}
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-green active:bg-green-800 text-sm"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TodoList;
