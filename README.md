# Weather Forecast Mapper

[Dark Sky Forecast API](https://developer.forecast.io/),
and [Google Maps](https://developers.google.com/maps/documentation/javascript/) mashup
built with React and MobX.

[https://ryanatkn.github.io/weather-forecast-mapper](https://ryanatkn.github.io/weather-forecast-mapper)

## Design discussion
- The Dark Skies API supports finding the forecast at a specific time,
  past or future, but this app does not use it.
  A possible enhancement would be allowing the user to click the days
  in the weekly view to jump to that day.
- The current day and weekly forecast data is used, but the hourly and minutely data is not.
  One enhancement would be to use the hourly data to show more information about today's weather.
- The layout with the large map and stats doesn't work too well for smaller screens.
  No attempt was made to resize things for different devices.

## Tech discussion
- Some unit tests are included for demonstration purposes. The app is not well tested.
  See `src/components/App/test.tsx` and `src/utils/format/test.ts` for these test examples.
- Uses the Google Maps API v3 with [these custom markers](http://www.benjaminkeen.com/google-maps-coloured-markers/).
- Uses [these weather icons](https://github.com/erikflowers/weather-icons) and [Fontello](http://fontello.com) for other icons.

## Develop

    npm install
    npm install -g tsd
    tsd install
    npm test
    npm start
    # browse to http://localhost:8080

## License
MIT
