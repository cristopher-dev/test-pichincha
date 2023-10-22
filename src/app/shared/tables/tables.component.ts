import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  inputSearch: FormGroup;
  bodies = [];
  private searchTerm$ = new Subject();

  @Input() set body(value: Array<any>) {
    if (value.length > 0) {
      this.bodies = value;
      this.cloneOriginData();
    }
  }
  @Input() header: any[] = [];
  saveOriginData: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.bodies.length > 0) {
      this.saveOriginData = [...this.bodies];
    }
    this.startForms();

    this.inputSearch
      .get('inputSearch')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.searchTerm$)
      )
      .subscribe((term: string) => {
        this.search(term);
      });
  }

  ngOnDestroy() {
    this.searchTerm$.complete();
  }
  private startForms() {
    this.inputSearch = this.fb.group({
      inputSearch: ['', [Validators.minLength(3)]],
    });
  }

  public rowClick(events, item) {
    console.log(item);
  }

  private search(id: string) {
    const forms = this.inputSearch.value;

    const dataFilter = this.saveOriginData.filter((item) => {
      // Verifica si la propiedad 'id' contiene el término de búsqueda
      const isSearch = item.id.includes(id);

      console.log(`Elemento:`, item, `¿Coincide?:`, isSearch);

      return isSearch;
    });

    if (dataFilter.length > 0) {
      this.bodies = [...dataFilter];
    } else if (!forms.inputSearch) {
      this.bodies = [...this.saveOriginData];
    } else {
      this.bodies = [];
    }
  }

  public resetSearch() {
    this.bodies = [...this.saveOriginData];
  }

  onSearchChange(term: Event): void {
    // Emitir el nuevo término de búsqueda al observable
    this.searchTerm$.next(term['data']);
  }

  cloneOriginData() {
    if (this.bodies.length > 0) {
      this.saveOriginData = [...this.bodies];
    }
  }
}
