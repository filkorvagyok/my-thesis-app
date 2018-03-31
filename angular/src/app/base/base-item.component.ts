import { ContactService } from './../contacts/contact.service';
import { ProjectService } from './../projects/project.service';
import { CompanyService } from './../companies/company.service';

export abstract class BaseItemComponent{
    constructor(protected service: CompanyService | ProjectService | ContactService){}

    /*Megvizsgáljuk a checkbox-okat és ha 1 vagy több 'checked'
	állapotban van, akkor a service-ben található checkedArray-nak elküljük a tömbböt, melyben a kijelölt elemek id-ja található, különben nem.*/
	public showChbox(): void{
		this.service.checkedArray.next($('input[type=checkbox]:checked').map(function(_, el) {
			return $(el).val();
		}).get().map(Number));
    }
    
    abstract navigateToDetail(id: number): void;
}