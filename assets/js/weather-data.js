export class WeatherData {
  constructor (cityName, description) {
    this.cityName = cityName;
    this.description = description;
    this.temperature = '';
  }
}

export const WEATHER_PROXY_HANDLER = {
  get (target, property) {
    return Reflect.get(target, property);
  },
  set (target, property, value) {
    const newValue = (value * 1.8 + 32).toFixed(2) + 'F.';
    return Reflect.set(target, property, newValue);
  }
};
