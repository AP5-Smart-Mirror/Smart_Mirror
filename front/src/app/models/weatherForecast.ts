import {Hourly} from './hourly';
import {Current} from './current';
import {Daily} from './daily';

export class WeatherForecast {
    city: string;
    current: Current;
    hourly: Hourly[];
    daily: Daily[];
}
