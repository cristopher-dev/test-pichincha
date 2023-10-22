import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './interface/productos.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('authorId', '21755026');
    const url: string = `${this.apiUrl}/ipf-msa-productosfinancieros/bp/products`;

    return this.http.get<Product[]>(url, { headers });
  }

  // Obtener un producto por ID
  getProductById(productId: number): Observable<Product> {
    const headers = new HttpHeaders().set('authorId', '21755026');

    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url, { headers });
  }

  // Agregar un nuevo producto
  addProduct(newProduct: Product): Observable<Product> {
    const headers = new HttpHeaders().set('authorId', '21755026');

    const url: string = `${this.apiUrl}/ipf-msa-productosfinancieros/bp/products`;
    return this.http.post<Product>(url, newProduct, { headers });
  }

  // Actualizar un producto existente
  updateProduct(updatedProduct: Product): Observable<Product> {
    const headers = new HttpHeaders().set('authorId', '21755026');
    const url = `${this.apiUrl}/ipf-msa-productosfinancieros/bp/products`;
    return this.http.put<Product>(url, updatedProduct, { headers });
  }

  // Eliminar un producto
  deleteProduct(productId: number): Observable<void> {
    const headers = new HttpHeaders().set('authorId', '21755026');
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<void>(url, { headers });
  }
}
