interface Industry{
	id: number;
	name: string;
}

interface EmployeesNumber{
	id: number;
	range: string;
}

interface YearlyIncome{
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
	project: number[];
	contact: number[];

	constructor(){
		this.headquarter = <Address>{};
		this.headquarter.country = <Country>{};
		this.billing = <Address>{};
		this.billing.country = <Country>{};
		this.mailing = <Address>{};
		this.mailing.country = <Country>{};
		this.contact = [];
		this.project = [];
	}
}