import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddUserDto, IUser, IUserCredentials, RequestStatus } from "../../../types/types";
import { Root } from "react-dom/client";

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

function fetchGenericAction<T = {}>(
  typePrefix: string,
  endpoint: string,
  altError: string,
  method: any
) {
  return createAsyncThunk(typePrefix, async (body: T, { rejectWithValue }) => {
    try {
      const response = await method(`${BASE_URL}/${endpoint}`, body);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || altError);
    }
  });
}

export const fetchRegister = fetchGenericAction<IAddUserDto>(
  "auth/register",
  "register",
  "failed to register",
  axios.post
);

export const fetchLogin = fetchGenericAction<IUserCredentials>(
  "auth/login",
  "login",
  "failed to login",
  axios.post
);

export const fetchValidateToken = fetchGenericAction(
  "auth/validateToken",
  "validate",
  "failed to validate",
  axios.get
);

export const fetchLogout = fetchGenericAction(
  "auth/logout",
  "logout",
  "failed to logout",
  axios.post
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
