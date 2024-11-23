import React from "react";
import styled from "styled-components";

const Card = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.cardText};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px 0;
  transition: all 0.3s ease;
`;

export default Card;
