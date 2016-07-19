import * as React from 'react';
import pureComponent from '../../utils/pureComponent';
import {ForecastData} from '../../types/ForecastData';
import ForecastWeekDay from '../ForecastWeekDay';

import './style.css';

interface Props {
  forecastData: ForecastData;
}

@pureComponent
export default class ForecastWeek extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {forecastData} = this.props;
    return (
      <div className="forecast-week">
        <div className="forecast-week-summary">
          {forecastData.daily.summary}
        </div>
        <div className="forecast-week-days">
          {forecastData.daily.data.map((d) => <ForecastWeekDay key={d.time} dailyData={d}/>)}
        </div>
      </div>
    );
  }
}
