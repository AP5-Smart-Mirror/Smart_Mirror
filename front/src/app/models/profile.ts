import { Widget } from './widget';

export class Profile {
    id: number;
    username: string;
    widgets: Array<Widget>;
    img: string;

    constructor(id: number, username: string, widgets: Array<Widget>, img: string){
        this.id = id;
        this.username = username;
        this.widgets = widgets;
        this.img = img;
    }
}
