import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { GoRepo } from 'react-icons/go';
import { FiUsers, FiUserPlus, FiStar, FiEye, FiMail, FiGlobe, FiMapPin, FiBriefcase, FiClock } from 'react-icons/fi';
import { AiOutlineFork } from 'react-icons/ai';

const UserInfo = () => {
  const { githubUser, repos } = React.useContext(GithubContext);

  // Safety check - don't render if no user data
  if (!githubUser || !repos) {
    return (
      <section className="section">
        <Wrapper className="section-center">
          <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>
            Loading user statistics...
          </div>
        </Wrapper>
      </section>
    );
  }

  const { 
    public_repos, 
    followers, 
    following, 
    created_at, 
    updated_at,
    name, 
    bio, 
    avatar_url, 
    html_url, 
    company, 
    location, 
    blog, 
    twitter_username,
    email,
    hireable,
    login
  } = githubUser;

  // Calculate additional stats from repos
  const totalStars = repos.reduce((total, item) => total + (item.stargazers_count || 0), 0);
  const totalForks = repos.reduce((total, item) => total + (item.forks_count || 0), 0);
  const totalWatchers = repos.reduce((total, item) => total + (item.watchers_count || 0), 0);

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get current local time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  // Helper function to render info items
  const renderInfoItem = (icon, label, value, link = null, fallback = 'Not set') => {
    if (!value || value === '') return null;
    
    const content = link ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    ) : value;

    return (
      <InfoItem key={label}>
        <InfoIcon>{icon}</InfoIcon>
        <InfoContent>
          <InfoLabel>{label}</InfoLabel>
          <InfoValue>{content}</InfoValue>
        </InfoContent>
      </InfoItem>
    );
  };

  const statsItems = [
    {
      id: 1,
      icon: <GoRepo className="icon" />,
      label: 'Repositories',
      value: public_repos,
      color: 'pink',
      subtitle: `${totalStars} stars • ${totalForks} forks`
    },
    {
      id: 2,
      icon: <FiUsers className="icon" />,
      label: 'Followers',
      value: followers,
      color: 'green',
      subtitle: 'People following you'
    },
    {
      id: 3,
      icon: <FiUserPlus className="icon" />,
      label: 'Following',
      value: following,
      color: 'purple',
      subtitle: 'People you follow'
    },
    {
      id: 4,
      icon: <FiStar className="icon" />,
      label: 'Total Stars',
      value: totalStars,
      color: 'blue',
      subtitle: 'Stars across all repos'
    },
    {
      id: 5,
      icon: <AiOutlineFork className="icon" />,
      label: 'Total Forks',
      value: totalForks,
      color: 'orange',
      subtitle: 'Forks across all repos'
    },
    {
      id: 6,
      icon: <FiEye className="icon" />,
      label: 'Total Watchers',
      value: totalWatchers,
      color: 'teal',
      subtitle: 'People watching repos'
    }
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <UnifiedCard>
          {/* User Profile Section */}
          <UserProfileSection>
            <AvatarContainer>
              <img src={avatar_url} alt={name || login} />
            </AvatarContainer>
            <UserDetails>
              <UserName>{name || login}</UserName>
              {login !== name && <UserLogin>@{login}</UserLogin>}
              {bio && <UserBio>{bio}</UserBio>}
              
              {/* User Information Grid */}
              <UserInfoGrid>
                {renderInfoItem(<FiBriefcase />, 'Company', company)}
                {renderInfoItem(<FiMapPin />, 'Location', location)}
                {renderInfoItem(<FiGlobe />, 'Website', blog, blog)}
                {renderInfoItem(<FiMail />, 'Email', email, email ? `mailto:${email}` : null)}
                {renderInfoItem(<FiClock />, 'Member Since', formatDate(created_at))}
                {renderInfoItem(<FiClock />, 'Last Updated', formatDate(updated_at))}
                {twitter_username && renderInfoItem(
                  <span>🐦</span>, 
                  'Twitter', 
                  `@${twitter_username}`, 
                  `https://twitter.com/${twitter_username}`
                )}
                {hireable !== null && (
                  <InfoItem>
                    <InfoIcon>💼</InfoIcon>
                    <InfoContent>
                      <InfoLabel>Available for Hire</InfoLabel>
                      <InfoValue>{hireable ? 'Yes' : 'No'}</InfoValue>
                    </InfoContent>
                  </InfoItem>
                )}
                <InfoItem>
                  <InfoIcon>🕐</InfoIcon>
                  <InfoContent>
                    <InfoLabel>Current Time</InfoLabel>
                    <InfoValue>{getCurrentTime()}</InfoValue>
                  </InfoContent>
                </InfoItem>
              </UserInfoGrid>

              <GitHubLink>
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                  View Full Profile on GitHub
                </a>
              </GitHubLink>
            </UserDetails>
          </UserProfileSection>

          {/* GitHub Statistics Section */}
          <StatsSection>
            <StatsGrid>
              {statsItems.map((item) => (
                <StatItem key={item.id}>
                  <IconContainer className={item.color}>
                    {item.icon}
                  </IconContainer>
                  <StatContent>
                    <StatValue>{item.value}</StatValue>
                    <StatLabel>{item.label}</StatLabel>
                    <StatSubtitle>{item.subtitle}</StatSubtitle>
                  </StatContent>
                </StatItem>
              ))}
            </StatsGrid>
          </StatsSection>
        </UnifiedCard>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.section`
  display: flex;
`;

const UnifiedCard = styled.article`
  background: var(--cardSurface);
  border: 1px solid var(--cardBorder);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
  width: 100%;

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

const UserProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--cardBorder);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
  
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid var(--accent);
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
`;

const UserLogin = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-normal);
`;

const UserBio = styled.p`
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  font-size: 1rem;
  line-height: 1.6;
`;

const UserInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: rgba(176, 124, 238, 0.05);
  border: 1px solid rgba(176, 124, 238, 0.1);
  border-radius: var(--radius-md);
  transition: var(--transition-normal);

  &:hover {
    background: rgba(176, 124, 238, 0.1);
    border-color: rgba(176, 124, 238, 0.2);
  }
`;

const InfoIcon = styled.div`
  color: var(--accent);
  font-size: 1rem;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
`;

const InfoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const InfoLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-xs);
`;

const InfoValue = styled.div`
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  
  a {
    color: var(--accent);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const GitHubLink = styled.div`
  margin-top: var(--spacing-md);
  
  a {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--accent);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(176, 124, 238, 0.1);
    border: 1px solid rgba(176, 124, 238, 0.2);
    border-radius: var(--radius-md);
    transition: var(--transition-normal);
    
    &:hover {
      background: rgba(176, 124, 238, 0.2);
      border-color: rgba(176, 124, 238, 0.3);
      transform: translateY(-1px);
    }
  }
`;

const StatsSection = styled.div`
  // Statistics section styling
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm);
  transition: var(--transition-normal);

  &:hover {
    transform: translateY(-1px);
  }
`;

const IconContainer = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  flex-shrink: 0;

  .icon {
    font-size: 1.2rem;
    color: var(--white);
  }

  &.pink {
    background: linear-gradient(135deg, #ec4899, #be185d);
  }

  &.green {
    background: linear-gradient(135deg, #10b981, #059669);
  }

  &.purple {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  }

  &.blue {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
  }

  &.orange {
    background: linear-gradient(135deg, #f97316, #ea580c);
  }

  &.teal {
    background: linear-gradient(135deg, #14b8a6, #0d9488);
  }

  &.indigo {
    background: linear-gradient(135deg, #6366f1, #4f46e5);
  }
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  color: var(--accent);
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
`;

const StatLabel = styled.div`
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  text-transform: capitalize;
  font-size: 0.9rem;
  font-weight: var(--font-weight-semibold);
`;

const StatSubtitle = styled.div`
  color: var(--text-secondary);
  margin-bottom: 0;
  font-size: 0.75rem;
  font-weight: var(--font-weight-normal);
  line-height: 1.3;
`;

export default UserInfo;
