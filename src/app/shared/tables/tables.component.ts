import { Component } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent {
  header = [
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
  ];
  body = [
    {
      id: 'trj-crd-1',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consum bajo la modalidad de credito',
      logo: 'mmmm',
      date_release: '2023-10-20T22:42:31.900+00:00',
      date_revision: '2023-10-20T22:42:31.900+00:00',
    },
    {
      id: 'trj-crd-2',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consum bajo la modalidad de credito',
      logo: 'mmmm',
      date_release: '2023-10-20T22:42:31.900+00:00',
      date_revision: '2023-10-20T22:42:31.900+00:00',
    },
    {
      id: 'trj-crd-3',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consum bajo la modalidad de credito',
      logo: 'mmmm',
      date_release: '2023-10-20T22:42:31.900+00:00',
      date_revision: '2023-10-20T22:42:31.900+00:00',
    },
    {
      id: 'trj-crd-4',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consum bajo la modalidad de credito',
      logo: 'mmmm',
      date_release: '2023-10-20T22:42:31.900+00:00',
      date_revision: '2023-10-20T22:42:31.900+00:00',
    },
    {
      id: 'trj-crd-5',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consum bajo la modalidad de credito',
      logo: 'mmmm',
      date_release: '2023-10-20T22:42:31.900+00:00',
      date_revision: '2023-10-20T22:42:31.900+00:00',
    },
  ];

  rowClick(events, item) {
    console.log(item);
  }
}
