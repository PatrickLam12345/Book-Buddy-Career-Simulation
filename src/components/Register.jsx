import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const registerRoute =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register";

export default function Register() {
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
    registerUser(inputs);
  };

  const registerUser = async (inputs) => {
    const register = await axios.post(registerRoute, inputs);
    navigate("/login");
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
      <h1>Registration</h1>
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
          Register
        </button>
      </form>
    </div>
  );
}
