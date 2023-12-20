import { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/api/User";

export const UserContext = createContext({ user: {}, setUser: () => {} });

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = await getUserProfile();
        setUser(currentUser.user);
      } catch (error) {
        console.error("Error fetching user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setUser, setLoading]);

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
