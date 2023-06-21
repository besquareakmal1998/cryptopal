import React, { useState } from 'react';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';

const Consolepage = () => {
  const [activeTab, setActiveTab] = useState<'SignIn' | 'SignUp'>('SignIn');

  const handleTabChange = (event: React.MouseEvent<HTMLDivElement>, newTab: 'SignIn' | 'SignUp') => {
    setActiveTab(newTab);
  };

  return (
    <div>
      <div className="tab-container">
        <div
          className={`tab ${activeTab === 'SignIn' ? 'active' : ''}`}
          onClick={(event) => handleTabChange(event, 'SignIn')}
        >
          Login
        </div>
        <div
          className={`tab ${activeTab === 'SignUp' ? 'active' : ''}`}
          onClick={(event) => handleTabChange(event, 'SignUp')}
        >
          Signup
        </div>
      </div>
      {activeTab === 'SignIn' ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Consolepage;
