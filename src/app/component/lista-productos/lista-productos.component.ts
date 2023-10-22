import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProductosService } from 'src/app/service/productos.service';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  public body = [];
  header: { th: string }[];
  constructor(private productosService: ProductosService) {}

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
  }
  getProducts() {
    this.productosService.getProducts().subscribe((value) => {
      this.body = value;
    });
  }
}
