import * as React from 'react';
import {observer} from 'mobx-react';
import ForecastModel from '../../models/ForecastModel';
import MarkerModel from '../../models/MarkerModel';
import MarkerColorPicker from '../MarkerColorPicker';
import ForecastCurrent from '../ForecastCurrent';
import ForecastWeek from '../ForecastWeek';
import LatLngForm from '../LatLngForm';
import LoadingAnimation from '../LoadingAnimation';

import './style.css';

interface Props {
  forecast: ForecastModel;
  marker: MarkerModel;
}

@observer
export default class ForecastDetail extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {forecast, marker} = this.props;
    return (
      <div className="forecast-detail">
        {forecast.isLoading || !forecast.data
          ? <LoadingAnimation/>
          : <div>
              <ForecastCurrent forecastData={forecast.data}/>
              <ForecastWeek forecastData={forecast.data}/>
            </div>
        }
        <LatLngForm lat={forecast.lat} lng={forecast.lng} onChange={this.doChangeLatLng}>
          <MarkerColorPicker activeIconColor={marker.iconColor}
            iconLetter={marker.iconLetter} onSelect={this.doSelectColor}
          />
        </LatLngForm>
      </div>
    );
  }

  doSelectColor = (color: string): void => {
    this.props.marker.setIconColor(color);
  };

  doChangeLatLng = (lat: number, lng: number): void => {
    // this.props.forecast.setPosition(lat, lng);
    this.props.marker.setPosition(lat, lng);
  };
}
