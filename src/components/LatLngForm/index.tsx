import * as React from 'react';
import pureComponent from '../../utils/pureComponent';

import './style.css';

interface Props {
  lat: number;
  lng: number;
  onChange(lat: number, lng: number): void;
}

interface State {
  lat: number;
  lng: number;
}

/**
 * The pattern used in this component is to use local state that is propagated
 * to the parent only when the forms are blurred, not on every change.
 * This is just one way to implement the desired behavior where the forecast is
 * queried only when it makes sense to, not on every keystroke.
 * Changes to props are synced back to the state in `componentWillReceiveProps`.
 */
@pureComponent
export default class LatLngForm extends React.Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      lat: props.lat,
      lng: props.lng,
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    // Keep the local state in sync with the props.
    this.setState({
      lat: nextProps.lat,
      lng: nextProps.lng,
    });
  }

  render(): JSX.Element {
    const {lat, lng} = this.state;
    return (
      <form className="pure-form pure-form-stacked lat-lng-form">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="latitude">
              latitude
            </label>
            <input type="number" id="latitude" value={lat} placeholder="latitude"
              onChange={this.doChangeLat} onBlur={this.doBlur}
            />
          </div>
          <div className="pure-control-group">
            <label htmlFor="longitude">
              longitude
            </label>
            <input type="number" id="longitude" value={lng} placeholder="longitude"
              onChange={this.doChangeLng} onBlur={this.doBlur}
            />
          </div>
          {this.props.children}
        </fieldset>
      </form>
    );
  }

  doBlur = (): void => {
    this.props.onChange(this.state.lat, this.state.lng);
  };

  doChangeLat = (e: React.FormEvent): void => {
    const lat = getNumberValue(e);
    this.setState({lat} as State); // need to coerce to avoid making the state properties optional 
  }

  doChangeLng = (e: React.FormEvent): void => {
    const lng = getNumberValue(e);
    this.setState({lng} as State); // need to coerce to avoid making the state properties optional 
  }
}

function getNumberValue(e: React.FormEvent): number {
  const target = e.target as HTMLInputElement;
  return Number(target.value);
}
