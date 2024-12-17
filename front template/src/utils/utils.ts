import { createAsyncThunk } from "@reduxjs/toolkit";

export function fetchGenericAction<D = never>(
  typePrefix: string,
  url: string,
  method: any,
  altError: string = ""
) {
  return createAsyncThunk(typePrefix, async (body: D, { rejectWithValue }) => {
    try {
      const response = await method(url, body);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message || altError);
    }
  });
}
