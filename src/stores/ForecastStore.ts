import {action} from 'mobx';
import ForecastModel from '../models/ForecastModel';

export default class ForecastStore {
  forecasts: ForecastModel[] = [];

  @action loadForecast = (lat: number, lng: number): ForecastModel => {
    let forecast = findForecast(this.forecasts, lat, lng);
    if (!forecast) {
      forecast = new ForecastModel().setPosition(lat, lng).loadData();
      this.forecasts.push(forecast);
    }
    return forecast;
  };
}

function findForecast(
  forecasts: ForecastModel[],
  lat: number,
  lng: number
): ForecastModel | undefined {
  return forecasts.filter((f) => f.lat === lat && f.lng === lng)[0];
}