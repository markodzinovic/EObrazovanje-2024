import { UserRole } from './enums';

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  cardNumber: string;
  balance: number;
  accountNumber: string;
}

export interface AddStudent {
  id: number;
  firstName: string;
  lastName: string;
  cardNumber: string;
  userName: string;
  password: string;
  role: UserRole;
}
