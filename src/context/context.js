import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {

    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({show: false, message: ""});
    // check rate lim

    const searchGithubUser = async (user) => {
        toggleError(false, "");
        setIsLoading(true);
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err));
        console.log(response);
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

    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({data}) => {
                let {
                    rate: {remaining},
                } = data;
                // remaining = 0;
                setRequests(remaining);
                if (remaining === 0) {
                    toggleError(true, "You have Exceeded hourly quota");
                }
            })
            .catch((error) => console.log(error));
    };

    function toggleError(show = false, msg = '') {
        setError({show, msg});
    };

    useEffect(checkRequests, []);

    return (
        <GithubContext.Provider value={{githubUser, repos, followers, requests, error, searchGithubUser, isLoading}}>
            {children}
        </GithubContext.Provider>
    );
}

export { GithubProvider, GithubContext };