import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createTodo } from "../services/api/Todo";
import { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import Loader from "../Components/Loader";
import TodoItems from "../Components/todo/TodoItems";
import CustomFormInput from "../Components/todo/CustomFormInput";

const TodoList = () => {
  const { todos, setTodos, loading } = useContext(TodoContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState(false);

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

  return (
    <>
      <div className="text-center py-3 md:py-5 mb-3 bg-white rounded">
        <h3 className="text-sm sm:text-base md:text-xl mb-2">Todo List</h3>
        <button
          className="btn btn-sm btn-accent text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Create Todo
        </button>
      </div>

      {loading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-x-auto">
          {todos.length !== 0 ? (
            todos.map((todo, index) => (
              <TodoItems key={todo._id} todo={todo} index={index} />
            ))
          ) : (
            <p className="text-white">No todos available.</p>
          )}
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
