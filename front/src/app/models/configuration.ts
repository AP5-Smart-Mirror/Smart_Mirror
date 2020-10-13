export class Configuration {
    id: number;
    pos_x_start: number;
    pos_x_end: number;
    pos_y_start: number;
    pos_y_end: number;
    size: number;

    constructor(id: number, pos_x_start: number, pos_x_end: number,pos_y_start: number,pos_y_end: number){
        this.id = id;
        this.pos_x_start = pos_x_start;
        this.pos_x_end = pos_x_end;
        this.pos_y_start = pos_y_start;
        this.pos_y_end = pos_y_end;
    }
}
