import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3 {
    margin: 0 0 20px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  button {
    cursor: pointer;
  }

  /* Global scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px; /* Width of vertical scrollbar */
    height: 8px; /* Height of horizontal scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1); /* Background of the track */
    border-radius: 10px; /* Round corners */
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(120deg, #007bff, #ff7bff); /* Gradient color for the thumb */
    border-radius: 10px; /* Round corners */
    border: 2px solid rgba(0, 0, 0, 0.1); /* Add spacing around the thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(120deg, #0056b3, #ff49eb); /* Change color on hover */
  }

  /* Optional for Firefox */
  scrollbar-width: thin; /* Makes the scrollbar thinner */
  scrollbar-color: #007bff rgba(255, 255, 255, 0.1); /* Thumb and track colors */
`;

export default GlobalStyles;
