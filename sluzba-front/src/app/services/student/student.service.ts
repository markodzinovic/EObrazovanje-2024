import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environment/environment';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { AddStudent } from '../../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getStudents(): Observable<Student[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authService.getToken(),
    });

    return this.http.get<Student[]>(`${environment.apiUrl}/students`, {
      headers: headers,
    });
  }

  addStudent(addTeacher: AddStudent): Observable<Student> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authService.getToken(),
    });

    return this.http.post<Student>(
      `${environment.apiUrl}/students/save`,
      addTeacher,
      {
        headers: headers,
      }
    );
  }
}
