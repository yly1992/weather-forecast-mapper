import * as React from 'react';
import {observer} from 'mobx-react';
import MarkerModel from '../../models/MarkerModel';
import MarkerIcon from '../MarkerIcon';

import './style.css';

interface Props {
  markers: MarkerModel[];
  activeMarker: MarkerModel | undefined;
  onSelect(marker: MarkerModel): void;
}

@observer
export default class MarkerColorPicker extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {markers, activeMarker, onSelect} = this.props;
    return (
      <div className="map-marker-picker">
        {markers.map((m) => (
          <MarkerIcon key={m.id} iconColor={m.iconColor} iconLetter={m.iconLetter}
            isActive={m === activeMarker} onSelect={onSelect} selectedValue={m}
          />
        ))}
        {this.props.children}
      </div>
    );
  }
}


