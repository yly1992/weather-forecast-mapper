/**
 * Formats a number between 0 and 1 as a percentage, so for example 0.5 becomes 50%.
 */
export function formatPct(value: number): string {
  return Math.round(value * 100) + '%';
}

/**
 * Formats wind speed and bearing.
 */
export function formatWind(windBearing: number, windSpeed: number): string {
  return formatDirection(windBearing) + ' ' + formatMph(windSpeed);
}

/**
 * Formats a number of miles per hour.
 */
export function formatMph(value: number, decimals: number = 0): string {
  return value.toFixed(decimals);
}

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

/**
 * Formats a directional value.
 * The value should be degrees between 0 and 359, where 0 as north moving clockwise.
 */
export function formatDirection(degrees: number): string {
  const index = Math.round(degrees / (360 / DIRECTIONS.length));
  return DIRECTIONS[index];
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Formats a day name from a UTC seconds number. NOT ms!
 */
export function formatDayName(time: number): string {
  return DAY_NAMES[new Date(time * 1000).getDay()];
}

/**
 * Formats degrees text.
 */
export function formatDegrees(degrees: number, showFahrenheit: boolean = true): string {
  return Math.round(degrees) + '°' + (showFahrenheit ? 'F' : '');
}
