import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Profile from "../Pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/users/login",
    element: <Login />,
  },
  {
    path: "/users/register",
    element: <Register />,
  },
]);

export default router;
