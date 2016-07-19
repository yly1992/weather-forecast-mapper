import * as React from 'react';
import pureComponent from '../../utils/pureComponent';
import {getIconUrl} from '../../models/MarkerModel';

import './style.css';

interface Props {
  iconColor: string;
  iconLetter: string;
  isActive: boolean;
  onSelect(value: any): void; // TODO revisit generic here
  selectedValue: any;         // and here
}

@pureComponent
export default class MarkerIcon extends React.Component<Props, {}> {
  render(): JSX.Element {
    const {iconColor, iconLetter, isActive} = this.props;
    return (
      <div onClick={this.doClick}
        className={'marker-icon' + (isActive ? ' active' : '')}
      >
         <img src={getIconUrl(iconColor, iconLetter)}/>
      </div>
    );
  }

  doClick = (): void => {
    return this.props.onSelect(this.props.selectedValue);
  };
}
