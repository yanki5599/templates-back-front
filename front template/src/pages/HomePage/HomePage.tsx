import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { fetchLogin, fetchRegister, fetchValidateToken } from "../../store/features/auth/authSlice";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import { IAddUserDto, IUserCredentials } from "../../types/types";
import "./HomePage.css";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { error } = useSelector((state: RootState) => state.auth);

  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    dispatch(fetchValidateToken()).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    });
  }, []);

  const handleToggle = () => {
    setIsRegistering((prev) => !prev);
  };

  const handleLogin = async (userCredentials: IUserCredentials) => {
    dispatch(fetchLogin(userCredentials)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    });
  };

  const handleRegister = async (addUserDto: IAddUserDto) => {
    dispatch(fetchRegister(addUserDto)).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        handleToggle();
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Our App
      </Typography>
      <Typography variant="body1" color="error">
        {error}
      </Typography>
      {isRegistering ? (
        <RegisterForm onRegister={handleRegister} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}

      <Button variant="text" color="primary" onClick={handleToggle}>
        {isRegistering ? "Already have an account? Log In" : "Don't have an account? Register"}
      </Button>
    </Box>
  );
};

export default HomePage;
