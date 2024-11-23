import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <Container>
      <h1>About This Project</h1>
      <p>
        This football web application provides users with real-time match
        results, detailed team statistics, and player profiles. It demonstrates
        the use of public APIs and modern web technologies like React.
      </p>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  line-height: 1.6;
`;

export default About;
