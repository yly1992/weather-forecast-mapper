import App from './index';
import * as React from 'react';
import {assert} from 'chai';
import {shallow} from 'enzyme';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import WeatherPage from '../WeatherPage';

describe('App', () => {
  it('should render the app components', () => {
    const wrapper = shallow(<App/>);
    assert.equal(wrapper.shallow().find(AppHeader).length, 1);
    assert.equal(wrapper.shallow().find(WeatherPage).length, 1);
    assert.equal(wrapper.shallow().find(AppFooter).length, 1);
  });
});
