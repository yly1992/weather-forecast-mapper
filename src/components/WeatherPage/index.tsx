import * as React from 'react';
import {observer, inject} from 'mobx-react';
import ForecastStore from '../../stores/ForecastStore';
import MapStore from '../../stores/MapStore';
import {Stores} from '../../types/Stores';
import Map from '../../components/Map';
import ForecastDetail from '../../components/ForecastDetail';
import MapMarkerPicker from '../../components/MapMarkerPicker';
import ForecastModel from '../../models/ForecastModel';
import MarkerModel from '../../models/MarkerModel';

interface SelectedStores {
  forecastStore?: ForecastStore;
  mapStore?: MapStore;
}

interface Props extends SelectedStores {}

@inject((stores: Stores): Props => ({
  forecastStore: stores.forecastStore,
  mapStore: stores.mapStore,
}))
@observer
export default class WeatherPage extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {forecastStore, mapStore} = this.props;
    const {activeMarker} = mapStore!.map;
    const activeForecast = findForecast(forecastStore!, activeMarker);
    return (
      <div className="page">
        <Map map={mapStore!.map} onClick={this.doClickMap}/>
        {mapStore!.map.markers.length > 0
          ? <MapMarkerPicker activeMarker={activeMarker}
              markers={mapStore!.map.markers}
              onSelect={this.doSelectMarker}
            >
              <button type="button" className="pure-button" onClick={this.doReloadActiveForecast}>
                <i className="icon-arrows-ccw"/>
              </button>
              <button type="button" className="pure-button" onClick={this.doRemoveActiveMarker}>
                <i className="icon-trash"/>
              </button>
            </MapMarkerPicker>
          : null
        }
        {activeMarker && activeForecast
          ? <ForecastDetail forecast={activeForecast} marker={activeMarker}/>
          : <div style={{textAlign: 'center'}}>
              <h3>
                Click the map to see the weather.
              </h3>
            </div>
        }
      </div>
    );
  }

  doClickMap = (e: google.maps.MouseEvent): void => {
    this.props.mapStore!.map.addMarker(e.latLng);
  };

  doRemoveActiveMarker = (): void => {
    const {map} = this.props.mapStore!;
    if (map.activeMarker) {
      map.removeMarker(map.activeMarker);
    }
  };

  doReloadActiveForecast = (): void => {
    const activeForecast = findForecast(
      this.props.forecastStore!,
      this.props.mapStore!.map.activeMarker
    );
    if (activeForecast) {
      activeForecast.loadData();
    }
  };

  doSelectMarker = (marker: MarkerModel): void => {
    this.props.mapStore!.map.setActiveMarker(marker);
  };
}

function findForecast(
  forecastStore: ForecastStore,
  marker: MarkerModel | undefined
): ForecastModel | undefined {
  return marker && forecastStore.loadForecast(marker.position.lat, marker.position.lng);
}