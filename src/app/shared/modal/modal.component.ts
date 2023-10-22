import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() showModal: boolean;
  @Output() deleteModal: EventEmitter<any> = new EventEmitter();
  delete(event: any): void {
    // Emitir el evento deleteModal con el objeto event
    this.deleteModal.emit(event);
  }
}
