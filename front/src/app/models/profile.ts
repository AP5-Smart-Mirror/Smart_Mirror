import { Widget } from './widget';

export class Profile {
    id: number;
    name: string;
    widgets: Array<Widget>;
    img: string;

    constructor(id: number, name: string, widgets: Array<Widget>, img: string){
        this.id = id;
        this.name = name;
        this.widgets = widgets;
        this.img = img;
    }
}
