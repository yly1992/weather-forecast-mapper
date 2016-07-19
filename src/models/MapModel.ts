import {action, observable, computed, asFlat, reaction} from 'mobx';
import MarkerModel from '../models/MarkerModel';

function createMapEl(): HTMLElement {
  const el = document.createElement('div');
  el.style.height = '100%';
  return el;
}

export default class MapModel {
  map: google.maps.Map;

  @observable markers: MarkerModel[] = asFlat([]);

  @computed get activeMarker(): MarkerModel | undefined {
    for (const m of this.markers) {
      if (m.isActive) {
        return m;
      }
    }
    return undefined;
  }

  constructor(lat: number, lng: number, el: HTMLElement = createMapEl()) {
    this.map = new google.maps.Map(el, {
      center: {lat, lng},
      scrollwheel: true,
      zoom: 8,
    });
  }

  @action addMarker = (
    markerOrLatLng: MarkerModel | google.maps.LatLng,
    setActive: boolean = true
  ): this => {
    const marker = markerOrLatLng instanceof MarkerModel
      ? markerOrLatLng
      : new MarkerModel(this.map, markerOrLatLng, true);
    marker.marker.addListener('click', () => this.setActiveMarker(marker));
    marker.marker.addListener('dragstart', () => this.setActiveMarker(marker, false));

    // Subscribe to changes on the marker,
    // and dispose of the reactions when the marker is destroyed.
    // This API could certainly be improved.
    const reactions: Function[] = [];
    reactions.push(reaction(
      () => ({lat: marker.position.lat, lng: marker.position.lng}),
      () => marker.isActive ? this.map.setCenter(marker.position) : null
    ));
    reactions.push(reaction(
      () => marker.isDestroyed,
      (isDestroyed) => {
        if (isDestroyed) {
          reactions.forEach((r) => r());
          reactions.length = 0;
        }
      },
    ));

    this.markers.push(marker);
    if (setActive) {
      this.setActiveMarker(marker);
    }
    return this;
  };

  @action setActiveMarker = (marker: MarkerModel, centerMapOnMarker = true): this => {
    this.markers.forEach((m) => m !== marker ? m.isActive = false : undefined);
    marker.isActive = true;
    if (centerMapOnMarker) {
      this.map.setCenter(marker.position);
    }
    return this;
  };

  @action removeMarker = (marker: MarkerModel): this => {
    if (marker.isActive) {
      const nextActiveMarker = this.getNextActiveMarker(marker);
      if (nextActiveMarker) {
        this.setActiveMarker(nextActiveMarker);
      }
    }
    this.markers.splice(this.markers.indexOf(marker), 1);
    marker.destroy();
    return this;
  };

  getNextActiveMarker(marker: MarkerModel): MarkerModel | undefined {
    const markerIndex = this.markers.indexOf(marker);
    const nextIndex = markerIndex === 0 ? 1 : markerIndex - 1;
    return this.markers[nextIndex];
  }

  findMarker(lat: number, lng: number): MarkerModel | undefined {
    return this.markers.filter((m) => m.position.lat === lat && m.position.lng === lng)[0];
  };
}
