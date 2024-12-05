import { Component, OnInit } from '@angular/core';
import { Student, UserRole } from '../../../models';
import { StudentService } from '../../../services';
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from '../../../components/custom-modal/custom-modal.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalService } from '../../../services/modal/modal.service';
import { AddStudent } from '../../../models/student';

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
  addStudentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.addStudentForm = this.fb.group({
      firstName: [, Validators.required],
      lastName: [, Validators.required],
      cardNumber: [, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

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

  onSubmit(idModal: string): void {
    if (!this.addStudentForm.valid) {
      console.log('Ne radi');
      return;
    }

    const _student = {
      ...this.addStudentForm.value,
      role: UserRole.ROLE_TEACHER,
    } as AddStudent;
    this.studentService.addStudent(_student).subscribe({
      next: (response) => {
        this.data.push(response);
        this.onCloseForm(idModal);
      },
      error: (error) => {
        console.error(error.message);
        // Handle error, e.g., show an error message
      },
    });
  }

  onCloseForm(idModal: string): void {
    this.closeModal(idModal);
    this.addStudentForm.reset();
  }

  openModal(idModal: string) {
    this.modalService.openModal(idModal);
  }

  closeModal(idModal: string): void {
    this.modalService.closeModal(idModal);
  }
}
