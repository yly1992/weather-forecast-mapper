import {observable, asReference, action, reaction, runInAction} from 'mobx';
import {ForecastData} from '../types/ForecastData';
import * as fetchJsonp from 'fetch-jsonp';

const DARK_SKIES_API_KEY = 'd908a431d0d5e112c7c89ec1dd9168b8';

function getDarkSkiesApiUrl(lat: number, lng: number, time?: number): string {
  const url = `https://api.forecast.io/forecast/${DARK_SKIES_API_KEY}/${lat},${lng}`;
  return time === undefined
    ? url
    : url + ',' + time;
}

export default class ForecastModel {
  @observable lat: number;
  @observable lng: number;
  @observable time: number | undefined; // currently not used, but included for the future

  // The raw data returned from the Dark Skies api is stored in this reference.
  // We use `asReference` because we don't want the entire data structure to be
  // made observable since mutations to it are not expected, and it's so large
  // that it would be significantly inefficient to make it observable.
  // If we want to refresh the data, we'll simply clobber the entire reference and redraw
  // everything, which is fine because refreshes are not expected to be performed rapidly.
  @observable data: ForecastData | undefined = asReference(undefined);
  @observable isLoading = false;

  constructor() {
    // React to changes and automatically query the new forecast data.
    // These changes should always be batched in an action to prevent multiple
    // requests from firing at once.
    // Note that data is not loaded when the model is first created.
    // `loadData` must be called or a `lat/lng/time` value must change for that to happen.
    reaction(
      () => (this.lat, this.lng, this.time),
      () => this.loadData()
    );
  }

  @action setPosition(lat: number, lng: number): this {
    this.lat = lat;
    this.lng = lng;
    return this;
  }

  @action loadData(): this {
    if (this.isLoading) {
      return this;
    }
    this.data = undefined;
    this.isLoading = true;
    const url = getDarkSkiesApiUrl(this.lat, this.lng, this.time);
    fetchJsonp(url)
      .then((res) => res.json())
      .then((data) => {
        runInAction(() => {
          this.data = data;
          this.isLoading = false;
        });
      })
      .catch(() => {
        // TODO currently tries again indefinitely, implement timeout/max attempts?
        setTimeout(() => this.loadData(), 1000);
      });
    return this;
  }
}