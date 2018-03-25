import { Contact } from './../contacts/contact';
import { Project } from './../projects/project';

export interface Industry{
	id: number;
	name: string;
}

export interface EmployeesNumber{
	id: number;
	range: string;
}

export interface YearlyIncome{
	id: number;
	range: string;
}

export interface Country{
	id: number;
	code: string;
	name: string;
}

export interface Address{
	country: Country;
	zipcode: string;
	settlement: string;
	address_line: string;
}

export class Company{
	id: number;
	logo: string;
	name: string;
	phone: string;
	email: string;
	website: string;
	facebook: string;
	taxnumber: number;
	headquarter: Address;
	billing: Address;
	mailing: Address;
	industry: Industry;
	employeesnumber: EmployeesNumber;
	yearlyincome: YearlyIncome;
	founded: number;
	project: Project[];
	contact: Contact[];

	constructor(){
		this.headquarter = <Address>{};
		this.headquarter.country = <Country>{};
		this.billing = <Address>{};
		this.billing.country = <Country>{};
		this.mailing = <Address>{};
		this.mailing.country = <Country>{};
		this.industry = <Industry>{};
		this.employeesnumber = <EmployeesNumber>{};
		this.yearlyincome = <YearlyIncome>{};
		this.contact = [];
		this.project = [];
	}
}