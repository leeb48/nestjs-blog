import React from 'react';
import './Landing.scss';

const Landing = () => {
  return (
    <div>
      <img className="landing" src={require('./landing.jpg')} alt="landing " />
    </div>
  );
};

export default Landing;
