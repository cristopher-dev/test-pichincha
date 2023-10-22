import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../service/productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css'],
})
export class FormularioProductoComponent implements OnInit {
  forms: FormGroup;
  idParams: string;
  dataReceived: object;
  reset = true;
  showModal = false;
  sectionModal = '';
  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.idParams = params.get('id');
    });
    // Accede a los datos pasados desde el componente anterior si están presentes
    const datosRecibidos = history.state ? history.state.datos : null;

    if (datosRecibidos && this.idParams === 'editar') {
      this.reset = false;
      this.dataReceived = datosRecibidos;
      this.editForms();
    } else {
      console.log('No se encontraron datos en el estado del historial.');
      this.startForms();
    }
  }

  private editForms() {
    let date_release = this.convertDate(
      this.dataReceived['data']['date_release']
    );

    let date_revision = this.convertDate(
      this.dataReceived['data']['date_revision']
    );

    this.forms = this.fb.group({
      id: [
        this.dataReceived['data']['id'],
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      name: [
        this.dataReceived['data']['name'],
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        this.dataReceived['data']['description'],
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: [this.dataReceived['data']['logo'], Validators.required],
      date_release: [null, [Validators.required, this.currentDateValidator]],
      date_revision: [null, [Validators.required, this.dateRevisionValidator]],
    });

    this.forms.get('date_release').setValue(date_release);
    this.forms.get('date_revision').setValue(date_revision);
  }

  private startForms() {
    this.forms = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: [null, [Validators.required, this.currentDateValidator]],
      date_revision: [null, [Validators.required, this.dateRevisionValidator]],
    });
  }

  resetForms() {
    this.forms.reset();
  }

  sendForms() {
    if (this.forms.valid && this.idParams === 'editar') {
      let formData = this.forms.value;
      formData.date_release = new Date(formData.date_release).toISOString();
      formData.date_revision = new Date(formData.date_revision).toISOString();

      // Llamar al servicio para agregar el producto
      this.productosService.updateProduct(formData).subscribe(
        (response) => {
          this.showModal = true;
          this.sectionModal = 'REGISTRO EDITADO';
        },
        (error) => {
          this.showModal = true;
          this.sectionModal = `REGISTRO ERROR\n ${error.error}`;
        }
      );
    }

    if (this.forms.valid && this.idParams === 'agregar') {
      let formData = this.forms.value;
      formData.date_release = new Date(formData.date_release).toISOString();
      formData.date_revision = new Date(formData.date_revision).toISOString();

      // Llamar al servicio para agregar el producto
      this.productosService.addProduct(formData).subscribe(
        (response) => {
          this.resetForms();
          this.showModal = true;
          this.sectionModal = 'REGISTRO GUARDADO';
        },
        (error) => {
          this.showModal = true;
          this.sectionModal = 'REGISTRO NO GUARDADO';
        }
      );
    }

    if (!this.forms.valid) {
      this.showModal = true;
      this.sectionModal = 'REVISE LOS CAMPOS POR QUE NO CUMPLE';
    }
  }

  currentDateValidator(control) {
    if (!control.value) {
      return null;
    }

    // Obtén la fecha actual
    const currentDate = new Date();

    // Obtén la fecha seleccionada
    const selectedDate = new Date(control.value);

    // Compara las fechas directamente
    return selectedDate >= currentDate ? null : { fechaActual: true };
  }

  // Validador de fecha de revisión
  dateRevisionValidator(control) {
    if (!control.value) {
      return null;
    }

    const date_release = control.root.controls.date_release?.value;
    const reviewDate = new Date(control.value);

    const oneYearLater = new Date(date_release);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    oneYearLater.setUTCHours(0, 0, 0, 0);
    reviewDate.setUTCHours(0, 0, 0, 0);

    // Comparar las fechas
    const isDateRevisionCorrect =
      reviewDate.getTime() >= oneYearLater.getTime();

    return isDateRevisionCorrect ? null : { reviewDate: true };
  }

  convertDate(data) {
    const dateRelease = new Date(data);

    // Obtener partes de la fecha
    const month = (dateRelease.getMonth() + 1).toString().padStart(2, '0');
    const day = dateRelease.getDate().toString().padStart(2, '0');
    const year = dateRelease.getFullYear();

    // Crear la cadena en el formato deseado
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  buttonAccepts(event) {
    this.showModal = false;
  }
}
