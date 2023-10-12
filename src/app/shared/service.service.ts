import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  //add Employee
  addEmployee(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/employees", data);
  }

  //Delete Data
  updateEmployee(id:number, data:any):Observable<any>{
    return this.http.delete(`http://localhost:3000/employees/${id}`, data);
  }
  //fatch data
  getAllEmployee():Observable<any>{
    return this.http.get("http://localhost:3000/employees");
  }

  //Delete Data
  deleteEmployee(id:any):Observable<any>{
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }
}
