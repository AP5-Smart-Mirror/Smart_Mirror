import { Configuration } from './configuration';
import { WidgetName } from '../enums/widget-name';

export class Widget {
	id: number;
	name: WidgetName;
	config: Configuration;

	constructor(id: number, name: WidgetName, config: Configuration) {
		this.id = id;
		this.name = name;
		this.config = config;
	}
}
