import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAddUserDto, IUser, IUserCredentials, RequestStatus } from "../../../types/types";
import { fetchGenericAction } from "../../../utils/utils";

axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface AuthStateType {
  user: IUser | null;
  status: RequestStatus;
  error: string;
}

const initialState: AuthStateType = {
  user: null,
  status: "Idle",
  error: "",
};

// "===============[👇 ASYNC THUNK 👇]===============";

export const fetchRegister = fetchGenericAction<IAddUserDto>(
  "auth/register",
  `${BASE_URL}/register`,
  axios.post,
  "failed to register"
);

export const fetchLogin = fetchGenericAction<IUserCredentials>(
  "auth/login",
  `${BASE_URL}/login`,
  axios.post,
  "failed to login"
);

export const fetchValidateToken = fetchGenericAction(
  "auth/validateToken",
  `${BASE_URL}/validate`,
  axios.get,
  "failed to validate"
);

export const fetchLogout = fetchGenericAction(
  "auth/logout",
  `${BASE_URL}/logout`,
  axios.post,
  "failed to logout"
);

//===============[👇 handleAsyncThunk 👇]===============

const handleAsyncThunk = (builder: any, thunk: any) => {
  builder
    .addCase(thunk.pending, (state: any) => {
      state.status = "Pending";
      state.error = "";
    })
    .addCase(thunk.fulfilled, (state: any, action: any) => {
      state.error = "";
      state.status = "Fulfilled";
      if (action.payload?.user) state.user = action.payload.user;
    })
    .addCase(thunk.rejected, (state: any, action: any) => {
      state.error = action.payload as string;
      state.status = "Rejected";
    });
};

export const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers(builder) {
    handleAsyncThunk(builder, fetchRegister);
    handleAsyncThunk(builder, fetchLogin);
    handleAsyncThunk(builder, fetchValidateToken);
    handleAsyncThunk(builder, fetchLogout);
  },
});

export const { clearError } = AuthSlice.actions;
export default AuthSlice.reducer;
