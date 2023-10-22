import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent {
  private searchTerm$ = new Subject<string>();
  @Input() body = [];
  header = [
    {
      th: 'id',
    },
    {
      th: 'name',
    },
    {
      th: 'description',
    },
    {
      th: 'logo',
    },
    {
      th: 'date_release',
    },
    {
      th: 'date_revision',
    },
    {
      th: 'acción',
    },
  ];

  originalData = [...this.body];

  constructor() {
    // Suscribirse al cambio de término de búsqueda después de un cierto tiempo de espera
    this.searchTerm$.pipe(debounceTime(1000)).subscribe((term) => {
      term = term ? term : '';
      this.search(term);
    });
  }

  public rowClick(events, item) {
    console.log(item);
  }

  private search(term: string) {
    // Restaurar los datos originales si el término de búsqueda está vacío
    if (!term.trim()) {
      this.body = [...this.originalData];
      return;
    }

    const dataFilter = this.originalData.filter((item) => {
      let isSearch = false;
      // Verifica si alguna clave contiene el término de búsqueda
      for (const key of Object.keys(item)) {
        const value: string = item[key].toString().toLowerCase();
        const searchTerm = term.toLowerCase();

        const isMin = value.length >= 3;
        if (!isMin) continue;

        // Utilizar expresiones regulares para evaluar la coincidencia
        const regex = new RegExp(`.*${searchTerm}.*`);
        const is = regex.test(value);
        if (is) {
          isSearch = true;
          break;
        } else {
          isSearch = false;
        }
      }

      console.log(`Elemento:`, item, `¿Coincide?:`, isSearch);

      return isSearch;
    });

    if (dataFilter.length > 0) {
      this.body = [...dataFilter];
    }
    console.log(dataFilter);
  }

  public resetSearch() {
    this.body = [...this.originalData];
  }

  onSearchChange(term: Event): void {
    // Emitir el nuevo término de búsqueda al observable
    this.searchTerm$.next(term['data']);
  }
}
