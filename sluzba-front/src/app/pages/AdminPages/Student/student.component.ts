import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models';
import { StudentService } from '../../../services';
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from '../../../components/custom-modal/custom-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomModalComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  data: Student[] = [];
  loading = true;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
        console.log(this.data);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
