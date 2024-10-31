import React from 'react';

const HeaderComponent: React.FC = () => {
  return (
    <header>
      <h1>Tenement Listings</h1>
    
      <div className="icons">
        <span>Street View Icon</span>
        <span>Route Planner Icon</span>
      
      </div>
    </header>
  );
};

export default HeaderComponent;
