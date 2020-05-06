import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestCreditService } from '../Services/request-credit.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent implements OnInit {

  idCredito: number;
  miCredito: any;

  constructor(private route: ActivatedRoute,private matSnackBar: MatSnackBar,private servicio: RequestCreditService) {
    this.idCredito = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.servicio.getRequestDetails(this.idCredito).subscribe(data => {
      this.miCredito = data["info"][0]
      console.log(this.miCredito);
    }, error => {
      this.matSnackBar.open('Ocurrió un error al momento de recuperar los detalles, por favor, recargue la página', 'Aceptar', {
        duration: 3000,
      });
    });
  }

  aceptarSolicitud()
  {
    this.servicio.acceptRequest({
      'monto': this.miCredito['MontoASolicitar'],
      'cuenta':this.miCredito['NumeroCuenta'],
      'idCredito':this.idCredito
    }).subscribe(data => {

      console.log(data);
      if ( data['status'] == 'correcto' )
      {
        this.matSnackBar.open('Prestamo acreditado correctamente', 'Aceptar', {
          duration: 2000,
        });
      }
 
    }, error => {
      this.matSnackBar.open('Ocurrió un error al momento de ingresar su solicitud, por favor intente de nuevo', 'Aceptar', {
        duration: 3000,
      });
    });
  }


  rechazarSolicitud()
  {
    this.servicio.cancelRequest({
      'idCredito':this.idCredito
    }).subscribe(data => {

      console.log(data);
      if ( data['status'] == 'correcto' )
      {
        this.matSnackBar.open('Prestamo acreditado correctamente', 'Aceptar', {
          duration: 2000,
        });
      }
 
    }, error => {
      this.matSnackBar.open('Ocurrió un error al momento de ingresar su solicitud, por favor intente de nuevo', 'Aceptar', {
        duration: 3000,
      });
    });
  }

}
