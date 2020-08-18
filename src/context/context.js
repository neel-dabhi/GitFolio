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
    const [loading, setIsLoading] = useState(false);
    // check rate lim

    const checRequests = () => {
        axios(`${rootUrl}/rate_limit`)
            .then(({data}) => {
                let {
                    rate: {remaining},
                } = data;
                setRequests(remaining);
                if (remaining === 0) {
                    //throw err
                }
            })
            .catch((error) => console.log(error));
    }

    useEffect(checRequests, []);

    return (<GithubContext.Provider value={{githubUser, repos, followers, requests}}>
            {children}
        </GithubContext.Provider>
    );
}

export { GithubProvider, GithubContext };