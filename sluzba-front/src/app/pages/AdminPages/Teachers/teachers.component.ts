import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddTeacher, Teacher, UserRole } from '../../../models';
import { TeacherService } from '../../../services';
import { CustomModalComponent } from '../../../components/custom-modal/custom-modal.component';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomModalComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent implements OnInit {
  showModal: boolean = true;

  data: Teacher[] = [];
  loading = true;
  addTeacherForm: FormGroup;

  constructor(
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.addTeacherForm = this.fb.group({
      firstName: [, Validators.required],
      lastName: [, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe({
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

  onSubmit(): void {
    if (!this.addTeacherForm.valid) {
      console.log('Ne radi');
      return;
    }

    const _teacher = {
      ...this.addTeacherForm.value,
      role: UserRole.ROLE_TEACHER,
    } as AddTeacher;

    this.teacherService.addTeacher(_teacher).subscribe({
      next: (response) => {
        this.data.push(response);
        this.closeModal();
      },
      error: (error) => {
        console.error(error.message);
        // Handle error, e.g., show an error message
      },
    });
  }

  onCloseForm(): void {
    this.addTeacherForm.reset();
    this.closeModal();
  }

  openModal() {
    this.modalService.openModal();
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
