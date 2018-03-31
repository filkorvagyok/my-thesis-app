import { Project } from './../project';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(
    public projectService: ProjectService
  ) {}

  ngOnInit() {
  }

  /*A paraméterben kapott project-et vizsgáljuk ebben a függvényben és ez alapján adunk vissza egy stringet, 
  melynek értéke egy szín lesz és ezt fogjuk használni az adott projekt hátterének a listában. Megnézzük hogy a 
  státusza 'Kész'-e? Ha igen, akkor szürkére változtatjük a hátteret, ha nem akkor tovább vizsgálódunk. 
  Megvizsgáljuk, hogy a prioritás 'Nagyon fontos', ekkor világospiros vagy 'Fontos', ekkor világossárga lesz a 
  háttere a paraméterben kapott értéknek. Ellenkező esetben nem változtazunk a háttér színén.*/
  getBackgroundColor(project: Project): string{
    if(project.status && project.status.state === 'Kész'){
      return '#eee';
    } else if(project.priority) {
      switch (project.priority.value){
        case 'Nagyon fontos':
          return '#ffe6e6';
        case 'Fontos':
          return 'lightgoldenrodyellow';
        default:
          return 'none';
      }
    }
  }

  /*Hasonlóan a getBackgroundColor függvény elejéhez itt is megvizsgáljuk a kapott projekt státuszát és ha az érték 'Kész', akkor itt a betüsínt változtatjük szürkére.*/
  getColor(project: Project): string{
    if(project.status && project.status.state === 'Kész'){
      return '#aaa'
    }
    return 'none';
  }
}
