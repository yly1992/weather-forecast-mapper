import * as React from 'react';
import {observer} from 'mobx-react';
import MapModel from '../../models/MapModel';

import './style.css';

interface Props {
  map: MapModel;
  onClick(e: google.maps.MouseEvent): void;
}

@observer
export default class Map extends React.Component<Props, {}> {
  mapWrapper: HTMLElement;
  clickListeners: google.maps.MapsEventListener[] = [];

  componentDidMount(): void {
    const {map} = this.props;
    this.mapWrapper.appendChild(map.map.getDiv());
    this.clickListeners.push(map.map.addListener('click', this.props.onClick));
  }

  componentWillUnmount(): void {
    this.clickListeners.forEach((l) => l.remove());
  }

  render(): JSX.Element {
    // const {store} = this.props;

    return (
      <div className="map">
        <div className="map-wrapper" ref={(el) => this.mapWrapper = el}/>
      </div>
    );
  }
}
