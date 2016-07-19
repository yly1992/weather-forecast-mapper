// Interfaces generated automatically from JSON at http://json2ts.com/
// Renamed some of the interfaces for better readability.

export interface ForecastData {
  latitude: number;
  longitude: number;
  timezone: string;
  offset: number;
  currently: Currently;
  minutely: Minutely;
  hourly: Hourly;
  daily: Daily;
  flags: Flags;
}

export interface Currently {
  time: number;
  summary: string;
  icon: string;
  nearestStormDistance: number;
  nearestStormBearing: number;
  precipIntensity: number;
  precipProbability: number;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  windSpeed: number;
  windBearing: number;
  visibility: number;
  cloudCover: number;
  pressure: number;
  ozone: number;
}

export interface MinutelyData {
  time: number;
  precipIntensity: number;
  precipProbability: number;
}

export interface Minutely {
  summary: string;
  icon: string;
  data: MinutelyData[];
}

export interface HourlyData {
  time: number;
  summary: string;
  icon: string;
  precipIntensity: number;
  precipProbability: number;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  windSpeed: number;
  windBearing: number;
  visibility: number;
  cloudCover: number;
  pressure: number;
  ozone: number;
  precipType?: string;
}

export interface Hourly {
  summary: string;
  icon: string;
  data: HourlyData[];
}

export interface DailyData {
  time: number;
  summary: string;
  icon: string;
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  precipIntensity: number;
  precipIntensityMax: number;
  precipProbability: number;
  temperatureMin: number;
  temperatureMinTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
  dewPoint: number;
  humidity: number;
  windSpeed: number;
  windBearing: number;
  visibility?: number;
  cloudCover: number;
  pressure: number;
  ozone: number;
  precipIntensityMaxTime?: number;
  precipType?: string;
}

export interface Daily {
  summary: string;
  icon: string;
  data: DailyData[];
}

export interface Flags {
  sources: string[];
  'darksky-stations': string[];
  'lamp-stations': string[];
  'isd-stations': string[];
  'madis-stations': string[];
  units: string;
}
