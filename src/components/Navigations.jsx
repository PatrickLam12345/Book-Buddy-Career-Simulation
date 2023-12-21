import { useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import bookLogo from "../assets/books.png";
import {
  Box,
  AppBar,
  Toolbar,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { selectUserSlice } from "../store/userSlice";

export default function Navigations() {
  const user = useSelector(selectUserSlice);
  return (
    <div>
      <Box marginBottom={10}>
        <AppBar>
          <Toolbar>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <img
                  src={bookLogo}
                  alt="Home"
                  style={{ width: "50px", height: "50px" }}
                />
              </Link>
              {user ? (
                <>
                  <Link
                    to="/user/account"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      marginLeft: "auto",
                      marginRight: "20px",
                    }}
                  >
                    Account
                  </Link>
                  <Link
                    to="/logout"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      marginRight: "20px",
                    }}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link
                    to="/login"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      marginLeft: "auto",
                      marginRight: "20px",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      marginRight: "20px",
                    }}
                  >
                    Register
                  </Link>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}
