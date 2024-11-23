import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTeamsByLeague } from "../../api/footballApi";

// Fetch teams based on league ID
export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (leagueId, { rejectWithValue }) => {
    try {
      const data = await getTeamsByLeague(leagueId);
      return data.response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamsSlice.reducer;
