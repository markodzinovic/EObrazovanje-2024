import { UserRole } from './enums';

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
}

export interface AddTeacher {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
}
