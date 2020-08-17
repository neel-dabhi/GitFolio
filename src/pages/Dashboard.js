import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  return (
    <main>
      {/* <Navbar></Navbar> */}
      {/* <Search></Search> */}
      <User></User>
      <Info></Info>
      <Repos></Repos>
    </main>
  );
};

export default Dashboard;
