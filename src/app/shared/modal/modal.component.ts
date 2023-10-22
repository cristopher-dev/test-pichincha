import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() header = '';
  @Input() footer = '';
  @Input() section = '';
  @Input() showModal: boolean;

  @Output() buttonAccepts: EventEmitter<any> = new EventEmitter();

  closeModal() {
    this.showModal = false;
    this.buttonAccepts.emit(false);
  }

  buttonAccept() {
    this.showModal = false;
    this.buttonAccepts.emit(true);
  }
}
