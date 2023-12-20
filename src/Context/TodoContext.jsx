import { createContext, useState } from "react";

export const TodoContext = createContext({ todo: {}, setTodo: () => {} });

export const TodoContextProvider = ({ children }) => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  const todoInfo = {
    todo,
    setTodo,
    loading,
    setLoading,
  };

  return (
    <TodoContext.Provider value={todoInfo}>{children}</TodoContext.Provider>
  );
};
