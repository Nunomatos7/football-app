import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMatches } from "../../api/footballApi";

// Fetch matches
export const fetchMatches = createAsyncThunk(
  "matches/fetchMatches",
  async (leagueId, { rejectWithValue }) => {
    try {
      const data = await getMatches(leagueId);
      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const matchesSlice = createSlice({
  name: "matches",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default matchesSlice.reducer;
