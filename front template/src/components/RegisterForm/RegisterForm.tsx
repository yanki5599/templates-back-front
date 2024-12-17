import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { IAddUserDto } from "../../types/types";
import { useForm } from "../../hooks/useForm";

interface RegisterFormProps {
  onRegister: (addUserDto: IAddUserDto) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const { values, handleChange, handleSubmit, resetForm } = useForm<IAddUserDto>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        handleSubmit(onRegister)(e);
        resetForm();
      }}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Username"
        variant="outlined"
        value={values.username}
        onChange={handleChange}
        name="username"
        required
      />
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
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
