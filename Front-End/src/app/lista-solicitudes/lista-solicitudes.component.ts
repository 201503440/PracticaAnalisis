import { Component, OnInit } from '@angular/core';
import { RequestCreditService } from '../Services/request-credit.service'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {

  misSolicitudes: any;

  constructor(private matSnackBar: MatSnackBar,private servicio: RequestCreditService) {
    this.servicio.getRequestCredit().subscribe(data => {
      this.misSolicitudes = data["info"]
    }, error => {
      this.matSnackBar.open('Ocurrió un error al momento de recuperar los registros, por favor, recargue la página', 'Aceptar', {
        duration: 3000,
      });
    });
  }

  ngOnInit() {
  }

}
