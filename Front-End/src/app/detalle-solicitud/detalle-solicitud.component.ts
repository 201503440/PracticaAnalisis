import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestCreditService } from '../Services/request-credit.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { InicioComponent } from '../inicio/inicio.component'

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent implements OnInit {

  miUsuario: any;

  model: NgbDateStruct;
  date: { year: number, month: number };
  fechaI: String = '';

  idCredito: number;
  miCredito: any;

  constructor(public padre:InicioComponent,private route: ActivatedRoute, private matSnackBar: MatSnackBar, private servicio: RequestCreditService,private router: Router) {
    
    this.padre.cambiarSeleccion3();
    this.miUsuario = JSON.parse(localStorage.getItem("currentUser"))

    if (this.miUsuario == null) {
      this.router.navigate(['/']);
    }
    
    this.idCredito = this.route.snapshot.params['id'];
    this.servicio.getRequestDetails(this.idCredito).subscribe(data => {
      this.miCredito = data["info"][0]
      console.log(this.miCredito);
    }, error => {
      this.matSnackBar.open('Ocurrió un error al momento de recuperar los detalles, por favor, recargue la página', 'Aceptar', {
        duration: 3000,
      });
    });
  }

  ngOnInit() {
  }

  aceptarSolicitud() {
    if (this.fechaI == '') {
      this.matSnackBar.open('Fecha de pago no seleccionada', 'Aceptar', {
        duration: 2000,
      });
    }
    else {
      this.servicio.acceptRequest({
        'monto': this.miCredito['MontoASolicitar'],
        'cuenta': this.miCredito['NumeroCuenta'],
        'fechaPago': this.fechaI,
        'idCredito': this.idCredito
      }).subscribe(data => {

        console.log(data);
        if (data['status'] == 'correcto') {
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


  rechazarSolicitud() {
    this.servicio.cancelRequest({
      'idCredito': this.idCredito
    }).subscribe(data => {

      console.log(data);
      if (data['status'] == 'correcto') {
        this.matSnackBar.open('El prestamo ha sido rechazado', 'Aceptar', {
          duration: 2000,
        });
      }

    }, error => {
      this.matSnackBar.open('Ocurrió un error al momento de ingresar su solicitud, por favor intente de nuevo', 'Aceptar', {
        duration: 3000,
      });
    });
  }

  miMetodo(data: any) {
    this.fechaI = data['year'] + '-' + data['month'] + '-' + data['day'];
  }

}
