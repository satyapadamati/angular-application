import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  loc: string;
  sal: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8081'; // Common base URL for all operations

  constructor(private http: HttpClient) {}

  // Fetch all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/list`);  // Adjust the endpoint for fetching employees
  }

  // Create a new employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/create`, employee);  // Adjust the endpoint for creating
  }

  // Update an existing employee
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/update`, employee);  // Adjust the endpoint for updating
  }

  // Delete an employee
  //deleteEmployee(id: number): Observable<void> {
  //return this.http.delete<void>(`${this.baseUrl}/delete`);  
  //}
  

  // deleteEmployee(id: number): Observable<void> {
  //   return this.http.delete<void>('${this.baseUrl}/delete?id=${id}'); // Use backticks for template literals
  // }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`); // Use backticks for template literals
  }
  

  //deleteEmployee(id: any): Observable<void> {
   // return this.http.request<void>('DELETE', '${this.baseUrl}/delete', id);
  // Use backticks here
  
  //deleteEmployee(id: any): Observable<void> {
    //return this.http.delete<void>('${this.baseUrl}/delete?id=${id}');
  //}

  //deleteEmployee(id: number): Observable<void> {
    //const url = ('${this.baseUrl}/delete?id=${id}');
    //return this.http.delete<void>(url);
  //}
  
  //deleteEmployee(employeeId: number): Observable<void> {
   // return this.http.delete<void>(`${this.baseUrl}/delete`, employeeId);
  //}
}
