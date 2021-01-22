export class Agenda {
	id: string;
	subject: string;
	start: DateMail;
	end: DateMail;
	organizer: Organizer;
}

class DateMail {
	dateTime: number;
	timeZone: string;
}

class Organizer {
	name: string;
	address: string;
}
