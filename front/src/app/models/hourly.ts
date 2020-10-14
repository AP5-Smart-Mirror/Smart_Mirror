export class Hourly {
    dateTime: Date;
    temperature: number;
    description: string;
    iconUrl: string;

    constructor(dateTime: any, temperature: number, description: string, iconUrl: string){
        this.dateTime = dateTime;
        this.temperature = temperature;
        this.description = description;
        this.iconUrl = iconUrl;
    }
}
