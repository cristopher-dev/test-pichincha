import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.css'],
})
export class FormularioProductoComponent implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {}
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
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      fechaLiberacion: [null, [Validators.required, this.fechaActualValidator]],
      fechaRevision: [null, [Validators.required, this.fechaRevisionValidator]],
    });
  }

  reiniciarFormulario() {
    this.formulario.reset();
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      // Realizar acciones adicionales cuando el formulario es válido
      console.log('Formulario válido:', this.formulario.value);
      // Puedes enviar el formulario al servidor u realizar otras acciones aquí
    } else {
      // Manejar acciones cuando el formulario no es válido
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
