import { Project } from './../projects/project';
import { Contact } from './../contacts/contact';
import { Company } from './../companies/company';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Task } from './task';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../base/base.service';

@Injectable()
export class TaskService extends BaseService{
    private tasksUrl = 'api/tasks';
    private tasks: Task[];
    isLoading = true;
    checkedArray = new Subject<number[]>();

    constructor(private http: HttpClient){
        super();
        this.getStartingdatas();
    }

    getStartingdatas(): void{
        this.http.get<Task[]>(this.tasksUrl)
        .pipe(
            tap(tasks => (`fetched tasks`)),
            catchError(this.handleError('getTasks', []))
        )
        .subscribe(
            (tasks: Task[]) => {
                this.tasks = tasks;
                this.isLoading = false;
            });
    }

    getItems(): Task[] {
		return this.tasks;
    }

    getItem(task: Task | number): Task{
        const id = typeof task === 'number' ? task : task.id;
        if(this.tasks){
            return this.tasks.find((task: Task) => task.id === id);
        }
        else{
            const url = `${this.tasksUrl}/${id}`;
            this.http.get<Task>(url).pipe(
                tap(_ => (`fetched task id=${id}`)),
                catchError(this.handleError<Task>(`getTask id=${id}`))
            )
            .subscribe((task: Task) => {
                this.isLoading = false;
                return task;
            });
        }
    }

    delete(task: Task | number): void{
        const id = typeof task === 'number' ? task : task.id;
        this.tasks.splice(this.tasks.indexOf(
            this.tasks.find(deletedTask => deletedTask.id === id)), 1
        );
    }

    add(task: Task): void{
        task.id = this.tasks[this.tasks.length - 1].id + 1;
        this.tasks.push(task);
    }

    update (task: Task): void{
        this.tasks.find(oldTask => oldTask.id === task.id)[0] = task;
    }

    getCertainItems(item: Company | Contact | Project): any{
        /* if(this.tasks){
            let tasks: Task[];
            item.task.forEach(taskID => {
                tasks.push(this.tasks.find(task => task.id === taskID));
            });
            return tasks;
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.getCertainItems(item);
        } */
    }

    modifyItems(item: Company | Contact | Project): void{
        /* if(this.tasks){
            if(item.hasOwnProperty('taxnumber')){
                let taskToBeModified = this.tasks
                    .filter(x => x.company.includes(item.id))
                    .filter(task => !item.task.includes(task.id));
                    taskToBeModified.forEach(task => {
                        task.company.splice(task.company.indexOf(item.id), 1);
                });
                if(item.task.length > 0){
                    item.task.forEach(taskID => {
                        const actualTask = this.tasks.find(task => task.id === taskID);
                        if(!actualTask.company.includes(item.id)){
                            actualTask.company.push(item.id);
                            this.update(actualTask);
                        }
                    })
                }
            } else if(item.hasOwnProperty('full_name')) {
                let taskToBeModified = this.tasks
                    .filter(x => x.contact.includes(item.id))
                    .filter(task => !item.task.includes(task.id));
                    taskToBeModified.forEach(task => {
                        task.contact.splice(task.contact.indexOf(item.id), 1);
                });
                if(item.task.length > 0){
                    item.task.forEach(taskID => {
                        const actualTask = this.tasks.find(task => task.id === taskID);
                        if(!actualTask.contact.includes(item.id)){
                            actualTask.contact.push(item.id);
                            this.update(actualTask);
                        }
                    })
                }
            } else if(item.hasOwnProperty('deadline')) {
                let taskToBeModified = this.tasks
                    .filter(x => x.project.includes(item.id))
                    .filter(task => !item.task.includes(task.id));
                    taskToBeModified.forEach(task => {
                        task.project.splice(task.project.indexOf(item.id), 1);
                });
                if(item.task.length > 0){
                    item.task.forEach(taskID => {
                        const actualTask = this.tasks.find(task => task.id === taskID);
                        if(!actualTask.project.includes(item.id)){
                            actualTask.project.push(item.id);
                            this.update(actualTask);
                        }
                    })
                }
            }
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.modifyItems(item);
        } */
    }

    deleteItems(item: Company | Contact | Project): void{
        if(this.tasks){
            if(item.hasOwnProperty('taxnumber')){
                this.tasks.filter(tasks => tasks.company.includes(item.id))
                .forEach(task => {
                    task.company.splice(task.company.indexOf(item.id), 1);
                    this.update(task);
                });
            } else if(item.hasOwnProperty('full_name')) {
                this.tasks.filter(tasks => tasks.contact.includes(item.id))
                .forEach(task => {
                    task.contact.splice(task.contact.indexOf(item.id), 1);
                    this.update(task);
                });
            } else if(item.hasOwnProperty('dealine')) {
                this.tasks.filter(tasks => tasks.project.includes(item.id))
                .forEach(task => {
                    task.project.splice(task.project.indexOf(item.id), 1);
                    this.update(task);
                });
            }
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.deleteItems(item);
        }
    }

    //Hibakezelő
	handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
         (`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}