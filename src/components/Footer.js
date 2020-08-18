import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 2rem 5rem;
  color: var(--white);
  text-align: center;
  font-weight: 500;
  font-size: 14px;

  a {
  color:var(--accent);
    padding: 5px;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Footer = () => (
    <StyledFooter>
        <div>
            <span>Built with</span>
            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                React.js
            </a>
            &middot;
            <a href="https://www.fusioncharts.com/" target="_blank" rel="noopener noreferrer">
                Fusion Charts
            </a>
            &middot;
            <a
                href="https://docs.github.com/en/rest"
                target="_blank"
                rel="noopener noreferrer">
                GitHub REST API
            </a>
            &middot;
            <a href="https://www.styled-components.com/" target="_blank" rel="noopener noreferrer">
                Styled Components
            </a>
            and more!
        </div>
        <div>
            <span>Designed & Built by</span>
            <a href="https://neelkanthjdabhi.github.io/" target="_blank" rel="noopener noreferrer">
                Neelkanth J. Dabhi
            </a>
        </div>
    </StyledFooter>
);

export default Footer;
