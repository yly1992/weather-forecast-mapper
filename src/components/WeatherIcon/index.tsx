import * as React from 'react';
import pureComponent from '../../utils/pureComponent';

import './style.css';

interface Props {
  icon: string;
}

@pureComponent
export default class WeatherIcon extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {icon} = this.props;
    return (
      <i className={`weather-icon wi ${getIconClass(icon)}`}/>
    );
  }
}

function getIconClass(icon: string): string {
  switch (icon) {
    case 'clear-day': return 'wi-day-sunny';
    case 'clear-night': return 'wi-night-clear';
    case 'rain': return 'wi-rain';
    case 'snow': return 'wi-snow';
    case 'sleet': return 'wi-sleet';
    case 'wind': return 'wi-strong-wind';
    case 'fog': return 'wi-fog';
    case 'cloudy': return 'wi-cloudy';
    case 'partly-cloudy-day': return 'wi-day-cloudy';
    case 'partly-cloudy-night': return 'wi-night-alt-cloudy';
    default: return 'wi-na';
  }
}
