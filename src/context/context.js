import React, { useState, useEffect, useCallback } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {

    const [githubUser, setGithubUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({show: false, message: ""});

    const checkRequests = useCallback(() => {
        axios(`${rootUrl}/rate_limit`)
            .then(({data}) => {
                let {
                    rate: {remaining},
                } = data;
                setRequests(remaining);
                if (remaining === 0) {
                    toggleError(true, "You have Exceeded hourly quota");
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const searchGithubUser = async (user) => {
        toggleError(false, "");
        setIsLoading(true);
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err));
        
        if (response) {
            setGithubUser(response.data);
            const {login, followers_url} = response.data;
            //repos req
            axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(response => setRepos(response.data));
            //followers url
            axios(`${followers_url}?per_page=100`).then(response => setFollowers(response.data));
        } else {
            toggleError(true, "No user found");
        }
        checkRequests();
        setIsLoading(false);
    }

    function toggleError(show = false, msg = '') {
        setError({show, msg});
    }

    // Load initial user data on first load
    useEffect(() => {
        const loadInitialUser = async () => {
            try {
                setIsLoading(true);
                
                // Load user data for "neel-dabhi" using REST API
                const userResponse = await axios(`${rootUrl}/users/neel-dabhi`);
                
                if (userResponse.data) {
                    setGithubUser(userResponse.data);
                    const {login, followers_url} = userResponse.data;
                    
                    // Load repos using REST API
                    const reposResponse = await axios(`${rootUrl}/users/${login}/repos?per_page=100&sort=updated`);
                    setRepos(reposResponse.data);
                    
                    // Load followers using REST API
                    const followersResponse = await axios(`${followers_url}?per_page=100`);
                    setFollowers(followersResponse.data);
                }
            } catch (err) {
                // Fallback to mock data if API fails
                setGithubUser(mockUser);
                setRepos(mockRepos);
                setFollowers(mockFollowers);
                
                // Show error message
                toggleError(true, `Failed to load GitHub data: ${err.message}. Using mock data.`);
            } finally {
                setIsLoading(false);
                checkRequests();
            }
        };

        loadInitialUser();
    }, [checkRequests]);

    return (
        <GithubContext.Provider value={{githubUser, repos, followers, requests, error, searchGithubUser, isLoading}}>
            {children}
        </GithubContext.Provider>
    );
}

export { GithubProvider, GithubContext };