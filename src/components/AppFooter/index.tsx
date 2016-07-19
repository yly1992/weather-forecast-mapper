import * as React from 'react';
import pureComponent from '../../utils/pureComponent';

import './style.css';

@pureComponent
export default class AppFooter extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className="app-footer">
        <div>
          powered by the
          {' '}
          <a href="https://developer.forecast.io/" className="link-unstyled">
            Dark Sky Forecast API
          </a>
          {' '}
          and
          {' '}
          <a href="https://developers.google.com/maps/documentation/javascript/"
            className="link-unstyled"
          >
            Google Maps
          </a>
        </div>
        <div>
          made with
          {' '}
          <a href="https://github.com/facebook/react" className="link-unstyled">
            React
          </a>
          {' '}
          and
          {' '}
          <a href="https://github.com/mobxjs/mobx" className="link-unstyled">
            MobX
          </a>
        </div>
        <div>
          <a href="https://github.com/ryanatkn/weather-forecast-mapper" className="link-unstyled">
            source on GitHub
          </a>
        </div>
      </div>
    );
  }
}
