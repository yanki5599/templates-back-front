import React, { FormEvent, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { IAddUserDto } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface RegisterFormProps {
  onRegister: (addUserDto: IAddUserDto) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const { error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Call your register function here
    onRegister({ email, username, password });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
