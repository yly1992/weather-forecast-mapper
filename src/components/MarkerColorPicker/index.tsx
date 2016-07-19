import * as React from 'react';
import pureComponent from '../../utils/pureComponent';
import {ICON_COLORS} from '../../models/MarkerModel';
import MarkerIcon from '../MarkerIcon';

import './style.css';

interface Props {
  activeIconColor: string;
  iconLetter: string;
  onSelect(color: string): void;
}

@pureComponent
export default class MarkerColorPicker extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {activeIconColor, iconLetter, onSelect} = this.props;
    return (
      <div className="marker-color-picker">
        {ICON_COLORS.map((color) => (
          <MarkerIcon key={color + iconLetter} iconColor={color} iconLetter={iconLetter}
            isActive={color === activeIconColor} onSelect={onSelect} selectedValue={color}
          />
        ))}
      </div>
    );
  }
}
