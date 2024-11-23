import React from "react";
import styled from "styled-components";

const MatchDetailsModal = ({ isOpen, matchDetails, onClose }) => {
  if (!isOpen || !matchDetails) return null;

  const {
    fixture: {
      date,
      referee,
      venue: { name: venueName, city: venueCity } = {},
    } = {},
    league: { name: leagueName, logo: leagueLogo } = {},
    teams: { home: homeTeam, away: awayTeam } = {},
  } = matchDetails;

  const formattedDate = new Date(date).toLocaleDateString("en-GB");
  const formattedTime = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Overlay>
      <ModalContent>
      <Header>
          <h2>Match Details</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <LeagueInfo>
          <LeagueLogo src={leagueLogo || ""} alt={leagueName || "League Logo"} />
          <span>{leagueName || "Unknown League"}</span>
        </LeagueInfo>
        <Teams>
          <Team>
            <TeamLogo src={homeTeam?.logo || ""} alt={homeTeam?.name || "Home Team"} />
            <span>{homeTeam?.name || "Home Team"}</span>
          </Team>
          <Versus>vs</Versus>
          <Team>
            <TeamLogo src={awayTeam?.logo || ""} alt={awayTeam?.name || "Away Team"} />
            <span>{awayTeam?.name || "Away Team"}</span>
          </Team>
        </Teams>
        <MatchInfo>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Time:</strong> {formattedTime}
          </p>
          <p>
            <strong>Venue:</strong> {venueName || "Unknown Venue"},{" "}
            {venueCity || "Unknown City"}
          </p>
          <p>
            <strong>Referee:</strong> {referee || "Not assigned"}
          </p>
        </MatchInfo>
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    margin: 0;
    text-align: left;
  }
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`

const LeagueInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 10px;
  }
`;

const LeagueLogo = styled.img`
  width: 50px;
  height: 50px;
`;

const Teams = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin-top: 10px;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
  }
`;

const TeamLogo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f0f0;
  padding: 5px;
`;

const Versus = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

const MatchInfo = styled.div`
  margin-top: 20px;

  p {
    font-size: 1rem;
    margin: 8px 0;
  }

  strong {
    font-weight: bold;
  }
`;

export default MatchDetailsModal;
