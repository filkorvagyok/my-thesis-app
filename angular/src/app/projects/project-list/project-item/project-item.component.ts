import { Router } from '@angular/router';
import { ProjectService } from './../../project.service';
import { Project } from './../../project';
import { Component, OnInit, Input } from '@angular/core';
import { BaseItemComponent } from '../../../base/base-item.component';

@Component({
  selector: '[app-project-item]',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent extends BaseItemComponent implements OnInit {
  @Input() project: Project;

  constructor(protected projectService: ProjectService,
    private router: Router) {
      super(projectService);
    }

    ngOnInit() {
    }

  navigateToDetail(id: number): void{
    this.router.navigate(['/project/shown', id]);
  }

  //Kiszámoljuk, hogy a határidő és a mai nap között hány nap különbség van.
	count(project: Project): number{
    let num: number;
    project.deadline = new Date(project.deadline);
		project.deadline.setHours(0,0,0,0);
		let newDate = new Date();
		newDate.setHours(0,0,0,0);
		return Math.round((project.deadline.getTime() - newDate.getTime())/86400000);
  }

  protected showChbox(): void{
    this.projectService.haveDone.next(false);
    const checkedProjects: number [] = $('input[type=checkbox]:checked').map(function(_, el) {
			return $(el).val();
    }).get().map(Number);
		this.projectService.checkedArray.next(checkedProjects);
    checkedProjects.forEach(
      (id: number) => {
        if(this.projectService.getItem(id).status && this.projectService.getItem(id).status.state === 'Kész')
        this.projectService.haveDone.next(true);
      }
    )
  }

  //Átírjuk a határidőt a kapott napok számával növelt mai dátumra.
  changeDate(project: Project, days:number)
  {
    project.deadline = new Date(new Date().getTime() + days * (1000 * 60 * 60 * 24));
    this.changeProject(project);
  }

  changeProject(project: Project)
  {
    this.projectService.update(project);
  }

  //Dátumválasztó beállítása
  datepickerOpts = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'yyyy. MM d.',
    showMeridian : false,
    maxHours: 24,
    language: 'hu'
}


}
