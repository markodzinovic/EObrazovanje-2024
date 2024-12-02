import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTeacher, Teacher } from '../../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTeachers(): Observable<Teacher[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authService.getToken(),
    });

    return this.http.get<Teacher[]>(`${environment.apiUrl}/teachers`, {
      headers: headers,
    });
  }

  addTeacher(addTeacher: AddTeacher): Observable<Teacher> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.authService.getToken(),
    });

    return this.http.post<Teacher>(
      `${environment.apiUrl}/teachers/save`,
      addTeacher,
      {
        headers: headers,
      }
    );
  }
}
