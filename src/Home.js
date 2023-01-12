import React from 'react';

const Home = ({ location }) => {
  return (
    <div>
      <h1>Welcome {location.state.name}</h1>
    </div>
  );
};

export default Home;