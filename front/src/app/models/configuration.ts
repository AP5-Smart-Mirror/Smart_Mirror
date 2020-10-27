export class Configuration {
	id: number;
	posXStart: number;
	posXEnd: number;
	posYStart: number;
	posYEnd: number;
	size: number;

	constructor(
		id: number,
		posXStart: number,
		posXEnd: number,
		posYStart: number,
		posYEnd: number
	) {
		this.id = id;
		this.posXStart = posXStart;
		this.posXEnd = posXEnd;
		this.posYStart = posYStart;
		this.posYEnd = posYEnd;
	}
}
