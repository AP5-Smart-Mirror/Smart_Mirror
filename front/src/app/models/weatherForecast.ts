import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class WeatherForecast {
    city: string;
    current: Current;
    hourly: Hourly[];
}

export class Hourly {
    dt: Date;
    temp: number;
    description: string;
    iconurl: string;

    constructor(dt: any, temp: number, description: string, iconurl: string){
        this.dt = dt;
        this.temp = temp;
        this.description = description;
        this.iconurl = iconurl;
    }
}
export class Current{
    temp: number;
    description: string;
    iconurl: string;
}
