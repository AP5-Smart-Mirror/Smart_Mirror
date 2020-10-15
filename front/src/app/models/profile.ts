import { Widget } from './widget';

export class Profile {
    id: number;
    name: string;
    widgets: Array<Widget>;

    constructor(id: number, name: string, widgets: Array<Widget>){
        this.id = id;
        this.name = name;
        this.widgets = widgets;
    }
}
