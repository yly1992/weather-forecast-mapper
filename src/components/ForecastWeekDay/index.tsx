import * as React from 'react';
import pureComponent from '../../utils/pureComponent';
import {DailyData} from '../../types/ForecastData';
import {formatPct, formatDayName, formatDegrees} from '../../utils/format';
import WeatherIcon from '../WeatherIcon';

import './style.css';

interface Props {
  dailyData: DailyData;
}

@pureComponent
export default class ForecastWeekDay extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {dailyData} = this.props;
    return (
      <div className="forecast-week-day">
        <div className="forecast-week-day-name">
          {formatDayName(dailyData.time)}
        </div>
        <div className="forecast-week-day-temperatures">
          <span className="forecast-week-day-temperature">
            {Math.round(dailyData.temperatureMin)}
          </span>
          <span className="forecast-week-day-temperature-spacer">
            -
          </span>
          <span className="forecast-week-day-temperature">
            {formatDegrees(dailyData.temperatureMax, false)}
          </span>
        </div>
        <WeatherIcon icon={dailyData.icon}/>
        <ul className="forecast-week-day-info">
          {renderInfo(formatPct(dailyData.precipProbability), 'precipitation')}
          {renderInfo(formatPct(dailyData.humidity), 'humidity')}
          {renderInfo(formatPct(dailyData.cloudCover), 'cloud cover')}
        </ul>
      </div>
    );
  }
}

function renderInfo(content: string, caption: string): JSX.Element {
  return (
    <li>
      <div>{content}</div>
      <small>{caption}</small>
    </li>
  );
}
