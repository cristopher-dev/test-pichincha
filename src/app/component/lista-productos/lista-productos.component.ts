import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ProductosService } from 'src/app/service/productos.service';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  inputSearch: FormGroup;
  public searchesTable: object;
  private searchTerm$ = new Subject();

  public body = [];
  header: { th: string }[];
  constructor(
    private productosService: ProductosService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.header = [
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
    this.startForms();

    this.inputSearch
      .get('inputSearch')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.searchTerm$)
      )
      .subscribe((term: string) => {
        this.searchesTable = {
          id: term,
          forms: this.inputSearch.value,
        };
      });
  }

  ngOnDestroy() {
    this.searchTerm$.complete();
  }

  getProducts() {
    this.productosService.getProducts().subscribe((value) => {
      for (const iterator of value) {
        iterator.date_release = this.convertDate(iterator.date_release);
        iterator.date_revision = this.convertDate(iterator.date_revision);
      }
      this.body = value;
    });
  }

  private startForms() {
    this.inputSearch = this.fb.group({
      inputSearch: ['', [Validators.minLength(3)]],
    });
  }

  onSearchChange(term: Event): void {
    // Emitir el nuevo término de búsqueda al observable
    this.searchTerm$.next(term['data']);
  }

  addButton() {
    console.log();
  }

  dropdown(event) {
    if (event.event === 'edit') {
      const navigationExtras: NavigationExtras = {
        state: {
          datos: event,
        },
      };
      this.router.navigate(['/formulario-producto/editar'], navigationExtras);
    }

    this.body = this.body.filter((v) => v.id !== event.data.id);
  }

  convertDate(data) {
    const dateRelease = new Date(data);

    // Obtener partes de la fecha
    const month = (dateRelease.getMonth() + 1).toString().padStart(2, '0');
    const day = dateRelease.getDate().toString().padStart(2, '0');
    const year = dateRelease.getFullYear();

    // Crear la cadena en el formato deseado
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  }
}
