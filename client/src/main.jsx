import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserInfo from "./pages/UserInfo/index.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import { RequireAuth } from "./context/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./AuthLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/userinfo",
        element: <UserInfo />,
      },

      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
    ],
  },

  {
    path: "login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>{" "}
  </React.StrictMode>
);
