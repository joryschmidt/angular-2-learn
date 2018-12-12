import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  
  // this would be http://localhost:port on anything but Cloud 9 of course
  uri = ``;
  
  constructor(private http:HttpClient) { }
  
  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }
  
  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }
  
  addIssue(title, responsible, description, severity) {
    const issue = { title, responsible, description, severity };
    
    return this.http.post(`${this.uri}/issues/add`, issue);
  }
  
  updateIssue(id, title, responsible, description, severity, status) {
    const issue = { title, responsible, description, severity, status };
    
    return this.http.put(`${this.uri}/issues/update/${id}`, issue);
  }
  
  deleteIssue(id) {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }
}
