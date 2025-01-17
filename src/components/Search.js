import React from 'react';
import styled from 'styled-components';
import {MdSearch} from 'react-icons/md';
import {GithubContext} from '../context/context';

const Search = () => {
    const [user, setUser] = React.useState('');
    const {requests, error, searchGithubUser, isLoading, githubUser} = React.useContext(GithubContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            searchGithubUser(user);
        }
    };

    const handleSearchClick = () => {
        if (user) {
            searchGithubUser(user);
        } else {
            alert('Please enter a username to search');
        }
    };

    return (
        <section className="section">
            <Wrapper className="section-center">
                <WelcomeMessage>
                    <h1>Welcome to GitFolio!</h1>
                    <p>Search for any GitHub user to view their profile, repositories, and contribution history.</p>
                </WelcomeMessage>

                <SearchContainer>
                    <form onSubmit={handleSubmit} autoComplete="on">
                        <FormControl>
                            <SearchIcon>
                                <MdSearch />
                            </SearchIcon>
                            <input
                                name="searchBarGitFolio"
                                type='text'
                                placeholder='Search for GitHub user (e.g., neel-dabhi)'
                                value={user}
                                onChange={event => setUser(event.target.value)}
                            />
                            {requests > 0 && !isLoading && (
                                <SearchButton type="button" onClick={handleSearchClick}>
                                    Search
                                </SearchButton>
                            )}
                        </FormControl>
                    </form>
                </SearchContainer>

                <InfoRow>
                    {githubUser && (
                        <InfoCard>
                            <span>Currently viewing:</span>
                            <strong>{githubUser.login}</strong>
                        </InfoCard>
                    )}
                    
                    <InfoCard>
                        <span>GitHub API Quota:</span>
                        <strong>{requests} / 60</strong>
                    </InfoCard>
                </InfoRow>

                {error.show && (
                    <ErrorWrapper>
                        <p>{error.msg}</p>
                    </ErrorWrapper>
                )}
            </Wrapper>
        </section>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
    align-items: center;
    text-align: center;

    @media (min-width: 768px) {
        gap: var(--spacing-2xl);
    }
`;

const WelcomeMessage = styled.div`
    margin-bottom: var(--spacing-lg);
    padding-top: var(--spacing-2xl);

    h1 {
        color: var(--text-primary);
        margin-bottom: var(--spacing-md);
        font-size: 3rem;
        font-weight: var(--font-weight-bold);
        line-height: 1.2;
    }

    p {
        color: var(--text-secondary);
        margin-bottom: var(--spacing-md);
        font-size: 1.5rem;
        max-width: 700px;
        line-height: 1.6;
    }
`;

const SearchContainer = styled.div`
    width: 100%;
    max-width: 500px;
    margin-bottom: var(--spacing-lg);
`;

const SearchIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    font-size: 1.2rem;
    flex-shrink: 0;
`;

const SearchButton = styled.button`
    background: var(--accent);
    color: var(--white);
    border: none;
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-md);
    font-family: var(--ff-primary);
    font-weight: var(--font-weight-medium);
    font-size: 0.875rem;
    cursor: pointer;
    transition: var(--transition-normal);

    &:hover {
        background: var(--accent-dark);
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
    }

    &:active {
        transform: translateY(0);
    }
`;

const InfoRow = styled.div`
    display: flex;
    gap: var(--spacing-lg);
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 600px;
`;

const InfoCard = styled.div`
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: var(--font-weight-medium);
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--cardSurface);
    border: 1px solid var(--cardBorder);
    border-radius: var(--radius-lg);
    min-width: 200px;
    flex: 1;
    
    span {
        color: var(--text-secondary);
        font-weight: var(--font-weight-normal);
        font-size: 0.875rem;
    }
    
    strong {
        color: var(--accent);
        font-weight: var(--font-weight-semibold);
        font-size: 1rem;
    }
`;

const ErrorWrapper = styled.div`
    background: rgba(229, 57, 53, 0.1);
    border: 1px solid var(--error);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    color: var(--error);
    max-width: 500px;
    width: 100%;

    p {
        margin: 0;
        font-size: 0.875rem;
        font-weight: var(--font-weight-medium);
    }
`;

const FormControl = styled.div`
    background: var(--cardSurface);
    border: 1px solid var(--cardBorder);
    border-radius: var(--radius-lg);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    transition: var(--transition-normal);
    position: relative;

    /* Clean pulsing border animation */
    &::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border: 2px solid var(--accent);
        border-radius: var(--radius-lg);
        opacity: 0;
        transform: scale(1);
        animation: cleanPulse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        pointer-events: none;
    }

    @keyframes cleanPulse {
        0% {
            transform: scale(1);
            opacity: 0;
        }
        20% {
            transform: scale(1.02);
            opacity: 0.4;
        }
        100% {
            transform: scale(1.04);
            opacity: 0;
        }
    }

    &:focus-within {
        border-color: var(--accent);
        box-shadow: var(--shadow-md);
        
        /* Subtle enhanced pulse when focused */
        &::before {
            animation: cleanPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
    }

    input {
        font-family: var(--ff-primary);
        border: none;
        outline: none;
        background: transparent;
        color: var(--text-primary);
        font-size: 1rem;
        font-weight: var(--font-weight-normal);
        padding: var(--spacing-sm) 0;
        position: relative;
        z-index: 1;

        &::placeholder {
            color: var(--text-muted);
            font-weight: var(--font-weight-normal);
        }
    }

    *:focus {
        outline: none;
    }
`;

export default Search;
