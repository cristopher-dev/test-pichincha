import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// ROUTER
import { AppRoutingModule } from './app-routing.module';

// DIRECTIVE
import { NgbdSortableHeader } from './component/lista-productos/directive/sortable.directive';

// COMPONENT
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './component/lista-productos/lista-productos.component';
import { MenuContextualComponent } from './component/menu-contextual/menu-contextual.component';
import { FormularioProductoComponent } from './component/formulario-producto/formulario-producto.component';

// LIBRARIES
import {
  NgbModule,
  NgbAlertModule,
  NgbTypeaheadModule,
  NgbDatepickerModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TablesComponent } from './shared/tables/tables.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    MenuContextualComponent,
    FormularioProductoComponent,
    TablesComponent,
  ],
  imports: [
    JsonPipe,
    NgbModule,
    FormsModule,
    DecimalPipe,
    BrowserModule,
    NgbAlertModule,
    AppRoutingModule,
    NgbdSortableHeader,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbDatepickerModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
