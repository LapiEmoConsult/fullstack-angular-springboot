import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Object> {

    return this.httpClient.get<Object>("/api/v1/todos");
  }

  public add(todo: string): Observable<Object> {
      return this.httpClient.post("/api/v1/todos", todo);
  }

  public delete(id: number): Observable<object> {
    return this.httpClient.delete(`/api/v1/todos/${id}`);
  }
}
