import axios from "axios";
import process from "process";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
});

export const getMatches = async (leagueId, season = 2024) => {
  const response = await apiClient.get(`/fixtures?season=${season}&league=${leagueId}`);
  const currentDate = new Date();

  const filteredMatches = response.data.response.filter((match) => {
    const matchDate = new Date(match.fixture.date);
    return matchDate >= currentDate; // Matches happening today or later
  });

  return { ...response.data, response: filteredMatches };
};

// Fetch match details for a specific fixture
export const getMatchDetails = async (fixtureId) => {
  const response = await apiClient.get(`/fixtures?id=${fixtureId}`);
  return response.data.response[0]; // Return the first item in the response array
};

export const getLeagues = async (season = 2024) => {
  const response = await apiClient.get(`/leagues?season=${season}`);
  return response.data;
};

export const getTeamsByLeague = async (leagueId, season = 2024) => {
  const response = await apiClient.get(`/teams?league=${leagueId}&season=${season}`);
  return response.data;
};

export const getTeamDetails = async (teamId) => {
  const response = await apiClient.get(`/players/squads?team=${teamId}`);
  return response.data;
};

export const getStandings = async (leagueId, season = 2024) => {
  const response = await apiClient.get(`/standings?season=${season}&league=${leagueId}`);
  return response.data;
};
