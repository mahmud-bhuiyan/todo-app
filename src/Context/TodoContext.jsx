import { createContext, useEffect, useState } from "react";
import { getUserTodos } from "../services/api/Todo";
import { toast } from "react-toastify";

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

  const todoInfo = {
    todos,
    setTodos,
    loading,
    setLoading,
  };

  return (
    <TodoContext.Provider value={todoInfo}>{children}</TodoContext.Provider>
  );
};
