import React from 'react';
import styled, { keyframes } from 'styled-components';

const ProgressBar = () => {
  return (
    <Wrapper>
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading GitHub profile...</LoadingText>
        <LoadingSubtext>Fetching data for neel-dabhi</LoadingSubtext>
      </LoadingContainer>
    </Wrapper>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: var(--spacing-2xl);
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid var(--cardBorder);
  border-top: 3px solid var(--accent);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingSubtext = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
  animation-delay: 0.5s;
`;

export default ProgressBar;
