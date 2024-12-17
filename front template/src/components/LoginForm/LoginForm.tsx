import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { IUserCredentials } from "../../types/types";
import { useForm } from "../../hooks/useForm";

interface LoginFormProps {
  onLogin: (userCredentials: IUserCredentials) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { values, handleChange, handleSubmit, resetForm } = useForm<IUserCredentials>({
    email: "",
    password: "",
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        handleSubmit(onLogin)(e);
        resetForm();
      }}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Email"
        variant="outlined"
        value={values.email}
        onChange={handleChange}
        required
        name="email"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={values.password}
        onChange={handleChange}
        required
        name="password"
      />
      <Button variant="contained" type="submit">
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
