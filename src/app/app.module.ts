import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// ROUTER
import { AppRoutingModule } from './app-routing.module';

// DIRECTIVE

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
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { LogoComponent } from './shared/logo/logo.component';
import { ModalComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    MenuContextualComponent,
    FormularioProductoComponent,
    TablesComponent,
    DropdownComponent,
    LogoComponent,
    ModalComponent,
  ],
  imports: [
    JsonPipe,
    NgbModule,
    FormsModule,
    DecimalPipe,
    BrowserModule,
    NgbAlertModule,
    AppRoutingModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
