import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import LeagueSelectorModal from "../components/LeagueSelectorModal";
import MatchDetailsModal from "../components/MatchDetailsModal"; // Updated Modal Component
import { setLeague } from "../redux/slices/leagueSlice";
import { fetchMatches } from "../redux/slices/matchesSlice";
import { getMatchDetails } from "../api/footballApi"; // New API call for match details

const Home = () => {
  const dispatch = useDispatch();
  const { selectedLeague } = useSelector((state) => state.league);
  const { list: matches } = useSelector((state) => state.matches);

  const [isLeagueModalOpen, setLeagueModalOpen] = useState(false);
  const [isMatchModalOpen, setMatchModalOpen] = useState(false);
  const [selectedMatchDetails, setSelectedMatchDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchMatches(selectedLeague));
  }, [dispatch, selectedLeague]);

  const handleMatchClick = async (match) => {
    try {
      const data = await getMatchDetails(match.fixture.id); // Use fixture.id for API call
      setSelectedMatchDetails(data);
      setMatchModalOpen(true); // Open the match details modal
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  const createPages = (matches, matchesPerPage = 6) => {
    const pages = [];
    for (let i = 0; i < matches.length; i += matchesPerPage) {
      pages.push(matches.slice(i, i + matchesPerPage));
    }
    return pages;
  };

  const matchPages = createPages(matches);

  return (
    <>
      <LeagueSelectorModal
        isOpen={isLeagueModalOpen}
        onClose={() => setLeagueModalOpen(false)}
        onLeagueSelect={(leagueId) => dispatch(setLeague(leagueId))}
      />
      <MatchDetailsModal
        isOpen={isMatchModalOpen}
        matchDetails={selectedMatchDetails}
        onClose={() => setMatchModalOpen(false)}
      />

      <FloatingButton onClick={() => setLeagueModalOpen(true)}>⚽</FloatingButton>

      <HomeContainer>
        <HeroSection>
          <HeroContent>
            <h1>Your Gateway to Football Insights</h1>
            <p>Real-time scores, upcoming matches, and the pulse of the game.</p>
          </HeroContent>
        </HeroSection>
        <MatchesSection>
          <h2>Upcoming Matches</h2>
          <MatchesScroll>
            {matchPages.map((page, pageIndex) => (
              <MatchPage key={pageIndex}>
                {page.map((match) => (
                  <MatchCard
                    key={match.fixture.id}
                    onClick={() => handleMatchClick(match)}
                  >
                    <TeamLogo src={match.teams.home.logo} alt={match.teams.home.name} />
                    <MatchDetails>
                      <strong>{match.teams.home.name}</strong>
                      <span>vs</span>
                      <strong>{match.teams.away.name}</strong>
                      <small>
                        {new Date(match.fixture.date).toLocaleDateString("en-GB")} -{" "}
                        {new Date(match.fixture.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </MatchDetails>
                    <TeamLogo src={match.teams.away.logo} alt={match.teams.away.name} />
                  </MatchCard>
                ))}
              </MatchPage>
            ))}
          </MatchesScroll>
        </MatchesSection>
      </HomeContainer>
    </>
  );
};

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

  &:hover {
    background: #0056b3;
    transform: scale(1.1);
  }
`;

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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;
  overflow: hidden;
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px 15px 20px;
  background: linear-gradient(180deg, #001f3f, transparent);
  width: 100%;
`;

const HeroContent = styled.div`
  max-width: 600px;
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    animation: ${fadeIn} 1s ease-in;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    animation: ${fadeIn} 1.5s ease-in;
  }
`;

const MatchesSection = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    animation: ${fadeIn} 2s ease-in;
  }
`;

const MatchesScroll = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 10px 0;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
`;

const MatchPage = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  scroll-snap-align: start;
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
`;

const MatchCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 10px 20px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const MatchDetails = styled.div`
  margin: 10px 0;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  span {
    margin: 5px 0;
    font-size: 1rem;
  }

  small {
    font-size: 0.9rem;
    color: #ffebff;
    margin-top: 5px;
  }
`;

const TeamLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
  background: #ffffff;
  padding: 5px;
`;

export default Home;
