import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import TodoList from "../Pages/TodoList";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Profile from "../Pages/Profile";
import PrivateRoute from "../Components/PrivateRoute";
import PublicRoute from "../Components/PublicRoute";
import UpdateProfile from "../Components/user/UpdateProfile";
import UpdatePassword from "../Components/user/UpdatePassword";
import CompleteTodoList from "../Pages/CompleteTodoList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <TodoList />
          </PrivateRoute>
        ),
      },
      {
        path: "/todos/complete",
        element: (
          <PrivateRoute>
            <CompleteTodoList />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/update",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/update/password",
        element: (
          <PrivateRoute>
            <UpdatePassword />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/users/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
    ],
  },
]);

export default router;
