import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import {GithubContext} from "../context/context";
import ReactTooltip from 'react-tooltip'
import styled from "styled-components";


const GitHubCalendarGrid = () => {
    const {githubUser} = React.useContext(GithubContext);
    const {login} = githubUser;

    const exampleTheme = {
        background: 'transparent',
        text: '#fff',
        grade4: '#311B92',
        grade3: '#512DA8',
        grade2: '#673AB7',
        grade1: '#9575CD',
        grade0: '#EDE7F6',
    };

    return <section className="section">
        <Wrapper className="section-center">
            <article className="item">
                <GitHubCalendar username={login} theme={exampleTheme} blockSize={15} showTotalCount={false}>
                    <ReactTooltip delayShow={50} html/>
                </GitHubCalendar>
            </article>
        </Wrapper>
    </section>;

}

const Wrapper = styled.section`
  display: flex;
  
  .item {
    width: 100%;
    border: 0px solid var(--accent);
    border-radius: var(--radius);
    padding: 1rem;
    background: var(--cardSurface);
    align-items: center;
    text-align: center;
    span {
      width: 3rem;
      height: 3rem;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      color:white;
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
    color: var(--white);
      margin-bottom: 0;
      text-transform: capitalize;
    }
  
  }
`;

export default GitHubCalendarGrid;