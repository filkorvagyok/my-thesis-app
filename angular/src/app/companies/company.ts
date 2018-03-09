export class Company{
	id: number;
	logo: string;
	name: string;
	phone: string;
	email: string;
	website: string;
	facebook: string;
	country_code: string;
	hq_country: string;
	hq_zipcode: number;
	hq_settlement: string;
	hq_address: string;
	bi_name: string;
	bi_country: string;
	bi_zipcode: number;
	bi_settlement: string;
	bi_address: string;
	taxnumber: number;
	mail_name: string;
	mail_country: string;
	mail_zipcode: number;
	mail_settlement: string;
	mail_address: string;
	industry_id: number;
	employeesnum_id: number;
	yearlyincome_id: number;
	founded: number;
	selected: boolean;
	project: number[];
	contact: number[];
	task: number[];

	constructor(id?: number, logo? : string, name?: string, phone?: string,	email?: string, website?: string,
	facebook?: string, country_code?: string, hq_country?: string, hq_zipcode?: number,
	hq_settlement?: string, hq_address?: string, bi_name?: string, bi_country?: string,	bi_zipcode?: number,
	bi_settlement?: string,	bi_address?: string, taxnumber?: number, mail_name?: string,
	mail_country?: string, mail_zipcode?: number, mail_settlement?: string, mail_address?: string,
	industry_id?: number, employeesnum_id?: number,	yearlyincome_id?: number, founded?: number,
	selected?: boolean,	project?: number[],	contact?: number[],	task?: number[]){
		this.id = id;
		this.bi_address = bi_address || "";
		this.bi_country = bi_country || "";
		this.bi_name = bi_name || "";
		this.bi_settlement = bi_settlement || "";
		this.bi_zipcode = bi_zipcode || null;
		this.contact = contact || [];
		this.country_code = country_code || "";
		this.email = email || "";
		this.employeesnum_id = employeesnum_id || null;
		this.facebook = facebook || "";
		this.founded = founded || null;
		this.hq_address = hq_address || "";
		this.hq_country = hq_country || "";
		this.hq_settlement = hq_settlement || "";
		this.hq_zipcode = hq_zipcode || null;
		this.industry_id = industry_id || null;
		this.logo = logo || "";
		this.mail_address = mail_address || "";
		this.mail_country = mail_country || "";
		this.mail_name = mail_name || "";
		this.mail_settlement = mail_settlement || "";
		this.mail_zipcode = mail_zipcode || null;
		this.name = name || "";
		this.phone = phone || "";
		this.project = project || [];
		this.selected = selected || false;
		this.taxnumber = taxnumber || null;
		this.website = website || "";
		this.yearlyincome_id = yearlyincome_id || null;
		this.task = task || [];
	}
}