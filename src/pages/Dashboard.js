import React from 'react';
import {Info, Repos, User, Search, Navbar, ProgressBar, Corner, Footer} from '../components';
import {GithubContext} from '../context/context';


const Dashboard = () => {
    const {isLoading} = React.useContext(GithubContext);

    if (isLoading) {
        return <main>

            <ProgressBar/>
            <Search></Search>
            <Corner/>
            <User></User>
            <Info></Info>
            <Repos></Repos>
            <Footer></Footer>
        </main>
    }
    return (
        <main>
            
            <Search></Search>
            <Corner/>
            <User></User>
            <Info></Info>
            <Repos></Repos>
            <Footer></Footer>
        </main>
    );
};

export default Dashboard;
