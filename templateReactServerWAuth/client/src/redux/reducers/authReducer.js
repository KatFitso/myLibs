import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "util/baseURL";
import { getCookie, setCookie } from "util/cookies";

const initialState = {
  authToken: "",
  userId: "",
  loading: false,
  err: "",
};

export const loginUser = createAsyncThunk(
  "userAuth/loginUser",
  async (payload) => {
    const res = await axios.post(`${baseURL}/auth/login`, payload);

    return res.data;
  }
);

export const signupUser = createAsyncThunk(
  "userAuth/signupUser",
  async (payload) => {
    const res = await axios.post(`${baseURL}/auth/signup`, payload);

    return res.data;
  }
);
export const getUserId = createAsyncThunk(
  "userAuth/getUserId",
  async (payload) => {
    const res = await axios.post(`${baseURL}/auth/findUser`, payload);

    return res.data;
  }
);

export const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authToken = "";
      state.userId = "";
    },
    setErr: (state, action) => {
      state.err = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.err) {
          state.err = data.msg;
          state.loading = false;
          return;
        }
        setCookie("token", data.token);
        state.authToken = data.token;
        state.userId = data.userId;
        state.loading = false;
      });
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.err) {
          state.err = data.msg;
          state.loading = false;
          return;
        }
        setCookie("token", data.token);
        state.authToken = data.token;
        state.userId = data.userId;
        state.loading = false;
      });
    builder
      .addCase(getUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserId.fulfilled, (state, action) => {
        state.authToken = getCookie("token");
        state.userId = action.payload.userId;
        state.loading = false;
      });
  },
});

export const selectAuth = (state) => state.userAuth.authToken;
export const selectUser = (state) => state.userAuth.userId;
export const selectLoading = (state) => state.userAuth.loading;
export const selectErr = (state) => state.userAuth.err;

export const { logout, setErr } = authSlice.actions;
export default authSlice.reducer;
