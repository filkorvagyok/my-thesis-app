import { Contact } from './../contacts/contact';
import { Company } from './../companies/company';

interface Status{
	id: number;
	state: string;
}

interface Priority{
	id: number;
	value: string;
}

interface Currency{
	id: number;
	code: string;
	name: string;
}

export class Project{
	id: number;
	name: string;
	description: string;
	company: Company[];
	file: string;
	contact: Contact[];
	deadline: Date;
	status: Status;
	priority: Priority;
	currency: Currency;
	income: number;
	expenditure: number;

	constructor(){
		this.company = [];
		this.contact = [];
		this.status = <Status>{};
		this.priority = <Priority>{};
		this.currency = <Currency>{};
	}
}