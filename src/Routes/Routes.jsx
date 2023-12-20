import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Profile from "../Pages/Profile";
import PrivateRoute from "../Components/PrivateRoute";
import PublicRoute from "../Components/PublicRoute";
import UpdateProfile from "../Components/user/UpdateProfile";
import UpdatePassword from "../Components/user/UpdatePassword";

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
            <Home />
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
