import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// register user async thunk method
export const registerUserAction = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      // Reject with an error message if the API call fails
      return rejectWithValue({
        message: error.response?.data?.message || "Registration failed",
      });
    }
  }
);

// login user async thunk method
export const loginUserAction = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || "Login failed",
      });
    }
  }
);

// logout user async thunk action
export const logoutUserAction = createAsyncThunk("/auth/logout", async () => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error logging out", error);
  }
});

// check the authentication for each user activity
export const checkAuthAction = createAsyncThunk(
  "/auth/check-auth",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store,no-cache,must-revalidate,proxy-revalidate",
          },
        }
      );

      return response.data;
    } catch (error) {
      return {
        message: error?.response?.data?.message || "Authentication failed",
      };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  // extraReducers helps to update state like what will happen after the api call
  extraReducers: (builder) => {
    // Register user builder
    builder
      .addCase(registerUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Login user builder
    builder
      .addCase(loginUserAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // authenticate user with every request
    builder
      .addCase(checkAuthAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // logout user
      .addCase(logoutUserAction.fulfilled, (state, action) => {
        console.log(action.payload);

        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice;
export default authSlice.reducer;
