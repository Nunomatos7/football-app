import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "../redux/slices/teamsSlice";
import { setLeague } from "../redux/slices/leagueSlice";
import LeagueSelectorModal from "../components/LeagueSelectorModal";
import styled, { keyframes } from "styled-components";

const Teams = () => {
  const dispatch = useDispatch();
  const { selectedLeague } = useSelector((state) => state.league);
  const { list: teams } = useSelector((state) => state.teams);
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams(selectedLeague));
  }, [dispatch, selectedLeague]);

  const filteredTeams = teams.filter((team) =>
    team.team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <LeagueSelectorModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onLeagueSelect={(leagueId) => dispatch(setLeague(leagueId))}
      />
      <FloatingButton onClick={() => setModalOpen(true)}>⚽</FloatingButton>

      <TeamsContainer>
        <Header>
          <h1>Explore Teams</h1>
          <SearchInput
            type="text"
            placeholder="Search teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Header>
        <TeamsGrid>
          {filteredTeams.map(({ team }) => (
            <TeamCard key={team.id}>
              <Link to={`/teams/${team.id}`}>
                <LogoContainer>
                  <img src={team.logo} alt={`${team.name} Logo`} />
                </LogoContainer>
                <TeamName>{team.name}</TeamName>
              </Link>
            </TeamCard>
          ))}
        </TeamsGrid>
      </TeamsContainer>
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TeamsContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 30px;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    animation: ${fadeIn} 1s ease-in;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background: #ffffff;
  color: #333333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeIn} 1.5s ease-in;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 220px; /* Fixed width */
  height: 280px; /* Fixed height */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
`;

const LogoContainer = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 50%;
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
`;

const TeamName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  margin-top: 10px;
  color: #000000;
  background-color: #ffffff;
  width: 100%;
  padding: 15px;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 9999;

  &:hover {
    background: #0056b3;
    transform: scale(1.1);
  }
`;

export default Teams;
