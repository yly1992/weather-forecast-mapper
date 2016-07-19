import * as React from 'react';
import WeatherPage from '../WeatherPage';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import pureComponent from '../../utils/pureComponent';

@pureComponent
export default class App extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <div>
        <AppHeader/>
        <WeatherPage/>
        <AppFooter/>
      </div>
    );
  }
}
