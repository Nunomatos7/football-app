import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamDetails } from "../api/footballApi";
import styled, { keyframes } from "styled-components";

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const data = await getTeamDetails(id);
      setTeam(data.response[0]);
    };
    fetchTeam();
  }, [id]);

  if (!team) return <Loading>Loading...</Loading>;

  return (
    <TeamContainer>
      <Header>
        <LogoContainer>
          <img src={team.team.logo} alt={`${team.team.name} Logo`} />
        </LogoContainer>
        <TeamInfo>
          <h1>{team.team.name}</h1>
          <p>Founded: {team.team.founded}</p> {/*Use another api*/}
          <p>Stadium: {team.team.stadium}</p> {/*Use another api*/}
          <p>Country: {team.team.country}</p> {/*Use another api*/}
        </TeamInfo>
      </Header>
      <PlayersSection>
        <h2>Players</h2>
        <PlayersGrid>
          {team.players.map((player) => (
            <PlayerCard key={player.id}>
              <PlayerImage>
                <img
                  src={player.photo || "https://via.placeholder.com/150"}
                  alt={player.name}
                />
              </PlayerImage>
              <PlayerDetails>
                <strong>{player.name}</strong>
                <p>Position: {player.position}</p>
                <p>Age: {player.age}</p>
              </PlayerDetails>
            </PlayerCard>
          ))}
        </PlayersGrid>
      </PlayersSection>
    </TeamContainer>
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

const TeamContainer = styled.div`
  padding: 20px;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 1.5rem;
  padding: 50px;
  color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-in;
`;

const LogoContainer = styled.div`
  background: #ffffff;
  border-radius: 50%;
  padding: 20px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

const TeamInfo = styled.div`
  text-align: left;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    margin: 5px 0;
  }
`;

const PlayersSection = styled.div`
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    animation: ${fadeIn} 1.2s ease-in;
  }
`;

const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
  padding: 0 20px;
`;

const PlayerCard = styled.div`
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
  justify-content: center;
  padding: 20px;
  width: 220px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const PlayerImage = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const PlayerDetails = styled.div`
  text-align: center;

  strong {
    font-size: 1.2rem;
    display: block;
    margin-bottom: 5px;
  }

  p {
    margin: 5px 0;
    font-size: 0.9rem;
    color: #ffebff;
  }
`;

export default TeamDetail;
