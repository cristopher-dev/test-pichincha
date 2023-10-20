import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './component/lista-productos/lista-productos.component';
import { FormularioProductoComponent } from './component/formulario-producto/formulario-producto.component';
import { MenuContextualComponent } from './component/menu-contextual/menu-contextual.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbAlertModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    FormularioProductoComponent,
    MenuContextualComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
