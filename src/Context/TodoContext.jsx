import { createContext, useEffect, useState } from "react";
import { deleteTodo, getUserTodos } from "../services/api/Todo";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const TodoContext = createContext({ todo: {}, setTodo: () => {} });

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getUserTodos();
        setLoading(false);

        if (response && response.tasks) {
          setTodos(response.tasks);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchTodos();
  }, []);

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

  const todoInfo = {
    todos,
    setTodos,
    loading,
    setLoading,
    handleDelete,
  };

  return (
    <TodoContext.Provider value={todoInfo}>{children}</TodoContext.Provider>
  );
};
