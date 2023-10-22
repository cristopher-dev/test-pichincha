import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './component/lista-productos/lista-productos.component';
import { FormularioProductoComponent } from './component/formulario-producto/formulario-producto.component';

const routes: Routes = [
  { component: ListaProductosComponent, path: 'lista-productos' },
  { component: FormularioProductoComponent, path: 'formulario-producto/:id' },
  { component: ListaProductosComponent, path: '**' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
