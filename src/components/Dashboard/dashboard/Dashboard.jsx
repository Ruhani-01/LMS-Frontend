import React from 'react';
import './dashboard.css';

function Dashboard() {
  return (
    <div className="container">
      <div className="left-panel">
   
        <div className="box-group">
          <div className="box box-small"></div>
          <div className="box box-small"></div>
        </div>
       
        <div className="box-group">
          <div className="box box-small"></div>
          <div className="box box-small"></div>
        </div>

        <div className="box box-large"></div>
      </div>
      <div className="right-panel">
        <div className="box box-half"></div>
        <div className="box box-half"></div>
      </div>
    </div>
  );
}

export default Dashboard;
