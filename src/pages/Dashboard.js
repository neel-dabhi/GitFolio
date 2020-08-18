import React from 'react';
import {Info, Repos, User, Search, Navbar, ProgressBar, Corner} from '../components';
import {GithubContext} from '../context/context';


const Dashboard = () => {
    const {isLoading} = React.useContext(GithubContext);

    if (isLoading) {
        return <main>
            {/*<Navbar></Navbar>*/}
            <ProgressBar/>
            <Search></Search>
            <Corner/>
            <User></User>
            <Info></Info>
            <Repos></Repos>
        </main>
    }
    return (
        <main>
            {/*<Navbar></Navbar>*/}
            <Search></Search>
            <Corner/>
            <User></User>
            <Info></Info>
            <Repos></Repos>
        </main>
    );
};

export default Dashboard;
