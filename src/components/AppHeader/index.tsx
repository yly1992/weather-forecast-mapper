import * as React from 'react';
import pureComponent from '../../utils/pureComponent';

import './style.css';

@pureComponent
export default class AppHeader extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className="app-header">
        <div className="app-header-content">
          <div className="app-header-text">
            <i className="wi wi-day-cloudy-gusts"/>
            <div>weather forecast mapper</div>
          </div>
        </div>
      </div>
    );
  }
}
