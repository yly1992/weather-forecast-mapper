import MapModel from '../models/MapModel';

// Center over Seattle by default.
// TODO could request the user's location.
const INITIAL_LATITUDE = 47.6062;
const INITIAL_LONGITUDE = -122.3321;

export default class MapStore {
  map = new MapModel(INITIAL_LATITUDE, INITIAL_LONGITUDE);
}
