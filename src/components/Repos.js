import React from 'react';
import styled from 'styled-components';
import {GithubContext} from '../context/context';
import {Pie3D, Doughnut2D} from './Charts';

const Repos = () => {
  const {repos} = React.useContext(GithubContext);

  // Safety check - don't render if no repos data
  if (!repos || repos.length === 0) {
    return (
      <section className="section">
        <Wrapper className="section-center">
          <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>
            Loading repository data...
          </div>
        </Wrapper>
      </section>
    );
  }

  // Iterate repos
  let languages = repos.reduce((total, item) => {
    const {language, stargazers_count} = item;

    if (!language) return total;

    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count };
    }

    return total;
  }, {});

  const mostUsed = Object.values(languages).sort((a, b) => {
    return b.value - a.value;
  }).slice(0, 7);

  // most stars
  const mostPopular = Object.values(languages).sort((a, b) => {
    return b.stars - a.stars;
  }).map((item) => {
    return { ...item, value: item.stars };
  }).slice(0, 7);

  return (
    <section className="section">
      <Wrapper className="section-center">
        <ChartContainer>
          <ChartCard>
            <ChartHeader>
              <ChartTitle>Most Used Languages</ChartTitle>
              <ChartSubtitle>Programming languages across your repositories</ChartSubtitle>
            </ChartHeader>
            <ChartWrapper>
              <Pie3D data={mostUsed} />
            </ChartWrapper>
          </ChartCard>
        </ChartContainer>
        
        <ChartContainer>
          <ChartCard>
            <ChartHeader>
              <ChartTitle>Most Popular by Stars</ChartTitle>
              <ChartSubtitle>Languages ranked by total stars received</ChartSubtitle>
            </ChartHeader>
            <ChartWrapper>
              <Doughnut2D data={mostPopular} />
            </ChartWrapper>
          </ChartCard>
        </ChartContainer>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: var(--spacing-2xl);
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }

  @media (min-width: 1024px) {
    gap: var(--spacing-2xl);
  }
`;

const ChartContainer = styled.div`
  width: 100%;
`;

const ChartCard = styled.div`
  background: var(--cardSurface);
  border: 1px solid var(--cardBorder);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
    border-color: var(--accent);
  }
`;

const ChartHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-lg);
`;

const ChartTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.025em;
`;

const ChartSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
  font-weight: var(--font-weight-normal);
`;

const ChartWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  div {
    border: none;
    border-radius: var(--radius-lg);
    width: 100% !important;
  }
  
  .fusioncharts-container {
    width: 100% !important;
  }
  
  svg {
    width: 100% !important;
    border-radius: var(--radius-lg) !important;
  }
`;

export default Repos;
