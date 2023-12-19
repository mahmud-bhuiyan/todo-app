import { createContext, useState } from "react";

export const UserContext = createContext({ user: {}, setUser: () => {} });

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
  };
  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};
