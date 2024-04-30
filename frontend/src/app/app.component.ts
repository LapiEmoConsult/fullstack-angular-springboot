import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputTextModule, FormsModule, ButtonModule, CommonModule, CheckboxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private service: TodoService){}

  title = 'Frontend';
  todos: any[] = [];

  myValue = '';

  onClickEnter(): void {
    console.log(this.myValue);
    console.log('TODO');
  }

  addTodo() {
    this.service.add(this.myValue).subscribe(next => this.todos.push(next));
    this.myValue = '';
  }

  ngOnInit(): void {
    this.getAll();
  }

    deleteTodo(id: number) {
      this.service.delete(id).subscribe(next => {
        this.getAll();
      });
    }

    getAll(): void {
      this.service.getAll()
      .subscribe((elt: any) => {
        this.todos = [];
        (elt as []).forEach(item => this.todos.push(item));
      });
    }
}
