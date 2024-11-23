import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from "./slices/teamsSlice";
import matchesReducer from "./slices/matchesSlice";
import leagueReducer from "./slices/leagueSlice";

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    matches: matchesReducer,
    league: leagueReducer,
  },
});

export default store;
