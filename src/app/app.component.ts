import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './interfaces/todo';
import { DatePipe } from '@angular/common';
import { TaskComponent } from "./component/task/task.component";
import { AddComponent } from "./component/add/add.component";
import { NoViewComponent } from './component/no-view/no-view.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, TaskComponent, AddComponent,NoViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  list:Todo[] = [];

  showList:Todo[] = this.list;

  ngOnInit(): void {
    const savedList = localStorage.getItem('todoList');
    if (savedList) {
      this.list = JSON.parse(savedList);
      this.showList = this.list;
    }
  }

  saveToLocalStorage(): void {
    localStorage.setItem('todoList', JSON.stringify(this.list));
  }

  addTask(newTask : Todo){
    if(this.list.length > 0){
      newTask.id = this.list[this.list.length - 1].id + 1;
    }else{
      newTask.id = 1;
    }
    if(newTask.date.length < 1){
      newTask.date = '';
    }
    
    this.list.push(newTask);
    this.showList = this.list;
    this.saveToLocalStorage();
  }

  delTask(id:number){
    this.showList = this.showList.filter((todo) => todo.id != id);
    this.list = this.list.filter((todo) => todo.id != id);
    this.saveToLocalStorage();
  }

  makeFav(id:number){
    const fav : Todo | undefined = this.list.find((item) => item.id == id);
    if(fav){
      fav.isfavourite = !fav.isfavourite;
    }
    this.saveToLocalStorage();
  }

  // makeComplete(id:number){
  //   const comp : Todo | undefined = this.list.find((item) => item.id == id);
  //   if(comp){
  //     comp.isCompleted = !comp.isCompleted;
  //   }
  // }

  showAll(){
    this.showList = this.list;
  }

  shoeFav(){
    this.showList = this.list.filter((item) => item.isfavourite != false);
    console.log(this.showList);
  }

  shoeComple(){
    this.showList = this.list.filter((item) => item.isCompleted != false);
    console.log(this.showList);
  }
}
