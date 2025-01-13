import React from 'react';
import {Info, Repos, Search, ProgressBar, Corner, Footer, GitHubCalendarGrid} from '../components';
import {GithubContext} from '../context/context';

const Dashboard = () => {
    // Move useContext to top level - before any conditional returns
    const {isLoading, githubUser} = React.useContext(GithubContext);
    
    // Show loading state only when actually loading and no user data
    if (isLoading && !githubUser) {
        return (
            <main>
                <ProgressBar/>
                <Search/>
                <Corner/>
                <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>
                    Loading GitHub profile for neel-dabhi...
                </div>
            </main>
        );
    }
    
    // Show main content when user data is available
    return (
        <main>
            <Search/>
            <Corner/>
            {githubUser && <Info/>}
            {githubUser && <GitHubCalendarGrid/>}
            {githubUser && <Repos/>}
            <Footer/>
        </main>
    );
};

export default Dashboard;
