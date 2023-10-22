import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  bodies = [];
  saveOriginData: any[] = [];
  @Input() header: any[] = [];

  @Input() set body(value: Array<any>) {
    if (value.length > 0) {
      this.bodies = value;
      this.cloneOriginData();
    }
  }
  @Input() set searches(value: object) {
    if (value) {
      this.search(value['id'], value['forms']);
    }
  }

  @Output() dropdown = new EventEmitter<object>();

  constructor() {}

  ngOnInit() {
    if (this.bodies.length > 0) {
      this.saveOriginData = [...this.bodies];
    }
  }

  public rowClick(events, item) {
    console.log(item);
  }

  private search(id: string, forms: string) {
    const dataFilter = this.saveOriginData.filter((item) => {
      // Verifica si la propiedad 'id' contiene el término de búsqueda
      const isSearch = item.id.includes(id);

      console.log(`Elemento:`, item, `¿Coincide?:`, isSearch);

      return isSearch;
    });

    if (dataFilter.length > 0) {
      this.bodies = [...dataFilter];
    } else if (!forms) {
      this.bodies = [...this.saveOriginData];
    } else {
      this.bodies = [];
    }
  }

  public resetSearch() {
    this.bodies = [...this.saveOriginData];
  }

  cloneOriginData() {
    if (this.bodies.length > 0) {
      this.saveOriginData = [...this.bodies];
    }
  }

  onClickDropdown(event, data) {
    this.dropdown.emit({ event, data });
  }
}
