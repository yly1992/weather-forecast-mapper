import * as React from 'react';
import pureComponent from '../../utils/pureComponent';

import './style.css';

@pureComponent
export default class LoadingAnimation extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div className="loading-animation">
         <i className="icon-spin2 animate-spin"/>
      </div>
    );
  }
}
