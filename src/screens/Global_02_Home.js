import "./Global_02_Home.css";

import React from 'react';
 
const HomePg = ({ onStart }) => {
  const onStartPress = () => onStart("lca")

  return (
    <div>
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
                  <div className="ui primary button" onClick={onStartPress}>
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

HomePg.defaultProps = {
  onStart: () => {}
}
 
export default HomePg;