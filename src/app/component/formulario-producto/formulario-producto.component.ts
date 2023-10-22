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
  formulario: FormGroup;
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

    this.formulario = this.fb.group({
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
      date_release: [null, [Validators.required]],
      date_revision: [null, [Validators.required]],
    });

    this.formulario.get('date_release').setValue(date_release);
    this.formulario.get('date_revision').setValue(date_revision);
  }

  private startForms() {
    this.formulario = this.fb.group({
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
      date_release: [null, [Validators.required, this.fechaActualValidator]],
      date_revision: [null, [Validators.required, this.fechaRevisionValidator]],
    });
  }

  resetForms() {
    this.formulario.reset();
  }

  sendForms() {
    if (this.formulario.valid && this.idParams === 'editar') {
      let formData = this.formulario.value;
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
          this.sectionModal = 'REGISTRO ERROR';
        }
      );
    }

    if (this.formulario.valid && this.idParams === 'agregar') {
      let formData = this.formulario.value;
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

    if (!this.formulario.valid) {
      this.showModal = true;
      this.sectionModal = 'REVISE LOS CAMPOS POR QUE NO CUMPLE';
    }
  }

  // Validador de fecha actual o mayor
  fechaActualValidator(control) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    return selectedDate >= currentDate ? null : { fechaActual: true };
  }

  // Validador de fecha de revisión
  fechaRevisionValidator(control) {
    if (!this) {
      return null;
    }
    const fechaLiberacion = this.formulario.get('fechaLiberacion')?.value;

    if (!fechaLiberacion) {
      return null; // o algún otro manejo si fechaLiberacion no está definido
    }

    const fechaRevision = new Date(control.value);
    const unAnoDespues = new Date(
      fechaLiberacion.getFullYear() + 1,
      fechaLiberacion.getMonth(),
      fechaLiberacion.getDate()
    );

    return fechaRevision.getTime() === unAnoDespues.getTime()
      ? null
      : { fechaRevision: true };
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
