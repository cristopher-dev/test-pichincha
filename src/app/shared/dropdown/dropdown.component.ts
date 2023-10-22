import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  isDropdownOpen = false;

  list = [
    { id: 'deleted', value: 'eliminar' },
    { id: 'edit', value: 'editar' },
  ];

  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private el: ElementRef) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  click(event) {
    this.onClick.emit(event);
  }
}
