import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  });

  return <></>;
}
