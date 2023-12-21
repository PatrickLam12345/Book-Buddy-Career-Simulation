import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import { useState } from "react";
import axios from "axios";

const loginRoute =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login";

const getUserRoute =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser(inputs);
  };

  const loginUser = async (inputs) => {
    const {
      data: { token },
    } = await axios.post(loginRoute, inputs);

    window.localStorage.setItem("token", token);

    const response = await axios.get(getUserRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUser(response.data));
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Login</h1>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          name="email"
          value={inputs.email}
          onChange={onChange}
          style={{ padding: "8px" }}
        />
        <input
          name="password"
          value={inputs.password}
          onChange={onChange}
          style={{ padding: "8px" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
