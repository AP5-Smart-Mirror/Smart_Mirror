import { Configuration } from './configuration';

export class Widget {
	id: number;
	name: string;
	config: Configuration;

	constructor(id: number, name: string, config: Configuration) {
		this.id = id;
		this.name = name;
		this.config = config;
	}
}
