import "./HomePg.css";

import React from 'react';
 
const HomePg = () => {
  return (
    <div>
      <div className="ui menu">
        <div className="ui fluid container">
          <div className="left menu">
            <a className="item"><i className="user icon"></i> Account</a>
          </div>
          <div className="right menu">
            <a className="item"><i className="sign out alternate icon"></i> Exit</a>
          </div>
        </div>
      </div>

      <div className="start-container">
        <div className="start-center">
          <div className="ui placeholder segment">
            <div className="ui two column stackable center aligned grid">
              <div className="ui vertical divider"/>

              <div className="middle aligned row">
                <div className="column">
                  <div className="ui icon header">
                    <i className="desktop icon"></i>
                  </div>
                  <div className="ui primary button">New Project</div>
                </div>
                <div className="column">
                  <div className="ui icon header">
                    <i className="chart area icon"></i>
                  </div>
                  <div className="ui primary button">
                    Start Page
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
 
export default HomePg;