import React, { useState, FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import { IUserCredentials } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface LoginFormProps {
  onLogin: (userCredentials: IUserCredentials) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Call your login function here
    onLogin({ email, password });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
