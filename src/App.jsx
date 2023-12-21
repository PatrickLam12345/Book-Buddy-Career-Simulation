import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigations from "./components/Navigations";
import Books from "./components/Books";
import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import SingleBook from "./components/SingleBook";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigations />,
      children: [
        {
          index: true,
          element: <Books />,
        },
        {
          path: "/user/account",
          element: <Account />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path: "/books/:bookId",
          element: <SingleBook />,
        },
      ],
    },
  ]);
  useEffect(() => {
    const possiblyLogin = async () => {
      const token = window.localStorage.getItem("token");
      const response = await axios.get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setUser(response.data));
    };

    possiblyLogin();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
