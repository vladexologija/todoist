import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  apiUrl: String = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.apiUrl + '/projects');
  }

  updateProjects(id, data) {
    return this.http.put(this.apiUrl + '/projects' + id, data);
  }
}
