import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class CustomModalComponent {
  @Input() title: string = 'Default Title';

  constructor(public modalService: ModalService) {}

  close() {
    this.modalService.closeModal();
  }
}
