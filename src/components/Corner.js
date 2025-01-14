import React from 'react';
import styled from 'styled-components';
import {GithubContext} from '../context/context';

const Corner = () => {
  const { error } = React.useContext(GithubContext);
  
  // Only show error information if there's an error
  if (!error.show) {
    return null;
  }
  
  return (
    <Wrapper>
      <ErrorInfo>
        <div>Error: {error.msg}</div>
      </ErrorInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(229, 57, 53, 0.9);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  font-family: monospace;
  border: 1px solid #e53935;
`;

const ErrorInfo = styled.div`
  div {
    margin: 2px 0;
  }
`;

export default Corner;
