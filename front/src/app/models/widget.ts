import { Configuration } from './configuration';
import { WidgetName } from '../enums/widget-name';

export class Widget {
	id: number;
	widget: WidgetName;
	config: Configuration;

	constructor(id: number, widget: WidgetName, config: Configuration) {
		this.id = id;
		this.widget = widget;
		this.config = config;
	}
}
