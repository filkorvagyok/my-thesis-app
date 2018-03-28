import { Contact } from './../contacts/contact';
import { Company } from './../companies/company';

export interface Status{
	id: number;
	state: string;
}

export interface Priority{
	id: number;
	value: string;
}

export interface Currency{
	id: number;
	code: string;
	name: string;
}

export class Project{
	id: number;
	name: string;
	description: string;
	company: Company[];
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
		this.deadline = new Date();
	}
}