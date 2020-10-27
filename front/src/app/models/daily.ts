export class Daily {
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
