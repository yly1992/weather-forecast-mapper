import 'purecss';
import '../static/weather-icons-master/css/weather-icons.css';
import '../static/fontello/css/fontello.css';
import '../static/fontello/css/animation.css';
import './styles/main.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {useStrict, reaction} from 'mobx';
import {Stores} from './types/Stores';
import {SavedData} from './types/SavedData';
import MapStore from './stores/MapStore';
import ForecastStore from './stores/ForecastStore';
import App from './components/App';
import SaveFile from './utils/SaveFile';
import MarkerModel from './models/MarkerModel';

// In a real application, I would use `useStrict(true)`,
// but some examples demonstrate the differences between using and not using
// actions, so we need to keep it disabled to prevent those examples from throwing.
useStrict(false);

/**
 * Create a save file.
 */
const saveFile = __TEST__ ? null : new SaveFile<SavedData>('weather-forecast-mapper');
const savedData = saveFile && saveFile.load();

/**
 * Create the MobX stores.
 */
const stores: Stores = {
  mapStore: new MapStore(),
  forecastStore: new ForecastStore(),
};

if (__DEV__) {
  const win: any = window;
  win.stores = stores;
}

/**
 * Hydrate from saved state;
 */
if (saveFile && savedData) {
  for (const m of savedData.markers) {
    const marker = MarkerModel.deserialize(stores.mapStore.map.map, m);
    stores.mapStore.map.addMarker(marker, false);
    if (marker.isActive) {
      stores.mapStore.map.setActiveMarker(marker);
    }
  }
}

/**
 * Persist state to local storage.
 */
if (saveFile) {
  reaction(
    () => {
      return {
        markers: stores.mapStore.map.markers.map((m) => m.serialize()),
      };
    },
    (data: SavedData) => {
      saveFile.save(data);
    }
  );
}

/**
 * Mount the app.
 */
const wrapper = document.getElementById('app-wrapper');
if (wrapper) {
  ReactDOM.render(
    <Provider {...stores}>
      <App/>
    </Provider>,
    wrapper
  );
} else {
  throw new Error('Unable to find app wrapper element');
}
