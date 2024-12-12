import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  @Output() addThis = new EventEmitter<Todo>();

  isComp : boolean = false;
  isfav:boolean = false;
  task : string = '';
  dueDate : string = '';
  ErrorMsg :string = '';

  today:string;

  constructor(){
    const date = new Date();
    this.today = date.toISOString().split('T')[0];
  }

  addTask(){
    if(this.validateInput()){
      const newTask:Todo = {
        id:0,
        cont: this.task,
        isCompleted:this.isComp,
        isfavourite:this.isfav,
        date: this.dueDate
      } 
        this.addThis.emit(newTask);
        this.resetView();
    }else{
        this.ErrorMsg = 'Please enter a valid "Task ." '
        this.resetView();
    }
    
  }

  validateInput():boolean{
    this.task = this.task.trim();
    if(this.task.length == 0){
      return false;
    }
    if(new Date() > new Date(this.dueDate))
        return false;
    return true;
  }

  resetView(){
    this.isComp = false;
    this.isfav = false;
    this.task = '';
    this.dueDate = '';
  }
}