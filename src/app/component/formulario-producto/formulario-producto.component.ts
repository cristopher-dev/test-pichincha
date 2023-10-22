import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../service/productos.service';
@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css'],
})
export class FormularioProductoComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {}
  ngOnInit() {
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
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

  reiniciarFormulario() {
    this.formulario.reset();
  }

  enviarFormulario() {
    if (!this.formulario.valid) {
      let formData = this.formulario.value;
      formData.date_release = new Date(formData.date_release).toISOString();
      formData.date_revision = new Date(formData.date_revision).toISOString();

      // Llamar al servicio para agregar el producto
      this.productosService.addProduct(formData).subscribe(
        (response) => {
          // Manejar la respuesta del servicio si es necesario
          console.log('Producto agregado con éxito:', response);
        },
        (error) => {
          // Manejar el error si ocurre
          console.error('Error al agregar producto:', error);
        }
      );
    } else {
      // Manejar el caso en que el formulario no es válido
      console.log(
        'Formulario no válido. Realizar acciones de manejo de errores aquí.'
      );
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
}
