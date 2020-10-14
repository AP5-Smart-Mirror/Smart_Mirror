import { Timestamp } from 'rxjs/internal/operators/timestamp';
import {Hourly} from './hourly';
import {Current} from './current';

export class WeatherForecast {
    city: string;
    current: Current;
    hourly: Hourly[];
}



