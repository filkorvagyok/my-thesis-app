import { Company } from './../companies/company';
import { Project } from '../projects/project';



export class Contact{
	id: number;
	company: Company[];
	full_name: string;
	surname: string;
	middle_name: string;
	forename: string;
	nickname: string;
	phone: string;
	email: string;
	project: Project[];

	constructor(){
		this.company = [];
		this.project = [];
	}
}