import {observable, computed, action, reaction} from 'mobx';
import ArrayLooper from '../utils/ArrayLooper';

let _id = 0;

export interface MarkerModelData {
  lat: number;
  lng: number;
  isActive: boolean;
  iconColor: string;
  iconLetter: string;
}

export const ICON_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ICON_COLORS = [
  'green', 'darkgreen', 'paleblue', 'blue',
  'purple', 'pink', 'red', 'orange', 'yellow', 'brown',
];

const INACTIVE_OPACITY = 0.76;

export function getIconUrl(iconColor: string, iconLetter: string): string {
  return `./static/Google Maps Markers/${iconColor}_Marker${iconLetter}.png`;
}

// Create a stateful iterator of letters and colors that loops.
const letters = new ArrayLooper(ICON_LETTERS.split(''));
const colors = new ArrayLooper(ICON_COLORS);

export default class MarkerModel {
  id = _id++;
  @observable position: {lat: number, lng: number};
  @observable isActive = false;
  @observable isDestroyed = false;
  @observable iconColor = colors.getNextItem();
  @observable iconLetter = letters.getNextItem();
  @computed get icon(): string {
    return getIconUrl(this.iconColor, this.iconLetter);
  }

  marker: google.maps.Marker;

  constructor(map: google.maps.Map, position: google.maps.LatLng, isActive: boolean = false) {
    this.isActive = isActive;
    this.position = {lat: position.lat(), lng: position.lng()};
    this.marker = new google.maps.Marker({map, position, icon: this.icon, draggable: true});
    this.marker.addListener('dragend', () => {
      const newPos = this.marker.getPosition();
      this.setPosition(newPos.lat(), newPos.lng());
    });

    // Propagate data changes on this model to the marker.
    reaction(
      () => ({lat: this.position.lat, lng: this.position.lng}),
      (pos) => this.marker.setPosition(pos)
    );
    reaction(() => this.icon, (i) => this.marker.setIcon(i));
    reaction(
      () => this.isActive,
      (a) => this.marker.setOptions({opacity: a ? 1.0 : INACTIVE_OPACITY} as any) // bad type def
    );
  }

  @action destroy(): this {
    google.maps.event.clearInstanceListeners(this.marker);
    this.marker.setMap(null as any); // TODO type is broken for strictNullChecks
    this.isDestroyed = true;
    return this;
  };

  @action setIconColor = (color: string): this => {
    this.iconColor = color;
    return this;
  };

  @action setIconLetter = (letter: string): this => {
    this.iconLetter = letter;
    return this;
  };

  @action setPosition = (lat: number, lng: number): this => {
    this.position.lat = lat;
    this.position.lng = lng;
    return this;
  };

  serialize(): MarkerModelData {
    return {
      lat: this.position.lat,
      lng: this.position.lng,
      isActive: this.isActive,
      iconColor: this.iconColor,
      iconLetter: this.iconLetter,
    };
  }

  static deserialize(map: google.maps.Map, data: MarkerModelData): MarkerModel {
    const position = new google.maps.LatLng(data.lat, data.lng);
    return new MarkerModel(map, position, data.isActive)
      .setIconColor(data.iconColor)
      .setIconLetter(data.iconLetter);
  }
}
