import React from 'react';
import styled from 'styled-components';
import {MdSearch} from 'react-icons/md';
import {GithubContext} from '../context/context';


const Search = () => {
    const [user, setUser] = React.useState('');
    const {requests, error, searchGithubUser, isLoading} = React.useContext(GithubContext);
    // get from global
    const
        handleSubmit = (e) => {
            e.preventDefault();
            console.log(user);
            if (user) {
                searchGithubUser(user);
            }
        };
    return <section className="section">
        <Wrapper className="section-center">
            {error.show &&
            <ErrorWrapper>
                <p>
                    {error.msg};
                </p>
            </ErrorWrapper>
            }
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <MdSearch></MdSearch>
                    <input type='text' placeholder='Search for GitHub user' value={user}
                           onChange={event => setUser(event.target.value)}/>
                    {requests > 0 && !isLoading && (< button type={"submit"}>Search</button>)}
                </div>
            </form>

            <h3>
                Request Quota : {requests} / 60
            </h3>

        </Wrapper>
    </section>;
};

const Wrapper = styled.div`

                        position: relative;
                        display: grid;
                        gap: 1rem 1.75rem;
                        @media (min-width: 768px) {
                        grid - template - columns: 1fr max-content;
                        align-items: center;
                        h3 {
                        padding: 0 0.5rem;
                        }
                        }
                        .form-control {
                        border-radius: var(--radius);
                        border: 0px solid var(--accent);
                        background: var(--cardSurface);
                        display: grid;
                        align-items: center;
                        grid-template-columns: auto 1fr auto;
                        column-gap: 0.5rem;
                        padding: 0.5rem;
                        input {
                        border-color: transparent;
                        outline-color: transparent;
                        letter-spacing: var(--spacing);
                        background:var(--darkGery);
                        color: var(--white);
                        padding: 0.25rem 0.5rem;
                        }
                        input:placeholder {
                        color: var(--accent);
                        text-transform: capitalize;
                        letter-spacing: var(--spacing);
                        }
                        *:focus {
                        outline: none;
                        }
                        button {
                        border-radius: var(--radius);
                        border: 1.5px solid var(--accent);
                        padding: 0.25rem 0.5rem;
                        text-transform: capitalize;
                        letter-spacing: var(--spacing);
                        background: transparent;
                        color: var(--accent);
                        transition: var(--transition);
  cursor: pointer;
  &:hover {}
}

  svg {
  color: var(--accent);
  font-size: 1.5rem;
  
}
  input,
  button,
    svg {
      font-size: 1rem;
                        }
                        @media (max-width: 800px) {
                        button,
                        input,
                        svg {
                        font-size: 0.85rem;
                        }
                        }
                        }
                        h3 {
                        margin-bottom: 0;
                        color: var(--accent);
                        font-weight: 100;
                        }
                        `;
const ErrorWrapper = styled.article`
                        position: absolute;
                        width: 90vw;
                        top: 0;
                        left: 0;
                        transform: translateY(120%);
                        text-transform: capitalize;
                        p {
                        color: red;
                        letter-spacing: var(--spacing);
                        }
                        `;
export default Search;
