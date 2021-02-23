import { Widget } from './widget';

export class Profile {
    id: number;
    idAccount: number;
    name: string;
    widgets: Array<Widget>;

    constructor(id: number, idAccount: number, name: string, widgets: Array<Widget>){
        this.id = id;
        this.idAccount = idAccount;
        this.name = name;
        this.widgets = widgets;
    }
}
