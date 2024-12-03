import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStates = new Map<string, BehaviorSubject<boolean>>();

  isModalOpen(id: string) {
    if (!this.modalStates.has(id)) {
      this.modalStates.set(id, new BehaviorSubject<boolean>(false));
    }
    return this.modalStates.get(id)?.asObservable();
  }

  openModal(id: string) {
    if (!this.modalStates.has(id)) {
      this.modalStates.set(id, new BehaviorSubject<boolean>(false));
    }
    this.modalStates.get(id)?.next(true);
  }

  closeModal(id: string) {
    if (this.modalStates.has(id)) {
      this.modalStates.get(id)?.next(false);
    }
  }
}
