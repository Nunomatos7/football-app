import { createSlice } from "@reduxjs/toolkit";

const leagueSlice = createSlice({
  name: "league",
  initialState: {
    selectedLeague: 39, // Default to Premier League
  },
  reducers: {
    setLeague: (state, action) => {
      state.selectedLeague = action.payload;
    },
  },
});

export const { setLeague } = leagueSlice.actions;
export default leagueSlice.reducer;
