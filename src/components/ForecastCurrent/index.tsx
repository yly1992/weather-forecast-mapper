import * as React from 'react';
import pureComponent from '../../utils/pureComponent';
import {ForecastData} from '../../types/ForecastData';
import {formatPct, formatWind, formatDegrees} from '../../utils/format';
import WeatherIcon from '../WeatherIcon';

import './style.css';

interface Props {
  forecastData: ForecastData;
}

@pureComponent
export default class ForecastCurrent extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {forecastData} = this.props;
    const data = forecastData.currently;
    return (
      <div className="forecast-current">
        <div className="forecast-current-header">
          <div className="forecast-current-header-content">
            <WeatherIcon icon={data.icon}/>
            <div className="forecast-current-header-text">
              <span>{formatDegrees(data.temperature)}</span>
              <small>{data.summary}</small>
            </div>
          </div>
        </div>
        <ul className="forecast-current-info">
          {renderInfo(formatPct(data.precipProbability), 'precipitation chance')}
          {renderInfo(formatPct(data.humidity), 'humidity')}
          {renderInfo(formatPct(data.cloudCover), 'cloud cover')}
          {renderInfo(
            <div>
              {formatWind(data.windBearing, data.windSpeed)}mph
            </div>,
            'wind'
          )}
        </ul>
      </div>
    );
  }
}


function renderInfo(content: JSX.Element|string, caption: JSX.Element|string): JSX.Element {
  return (
    <li>
      <div>{content}</div>
      <small>{caption}</small>
    </li>
  );
}