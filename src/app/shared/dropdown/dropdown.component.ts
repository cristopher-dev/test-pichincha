import { Component, ElementRef, HostListener } from '@angular/core';

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
    console.log(event);
  }
}
