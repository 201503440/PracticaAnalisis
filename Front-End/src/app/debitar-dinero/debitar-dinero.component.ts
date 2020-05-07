import { Component, OnInit } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { RequestCreditService } from '../Services/request-credit.service'

@Component({
  selector: 'app-debitar-dinero',
  templateUrl: './debitar-dinero.component.html',
  styleUrls: ['./debitar-dinero.component.css']
})
export class DebitarDineroComponent implements OnInit {

  miUsuario: any;
  misCreditos: any;

  montoInput: number;
  cuentaInput: number;
  descripcionInput: string;

  constructor(public padre: InicioComponent, private matSnackBar: MatSnackBar, private servicio: RequestCreditService, private router: Router) {
    this.padre.cambiarSeleccion5();

    this.miUsuario = JSON.parse(localStorage.getItem("currentUser"))
    if (this.miUsuario == null) {
      this.router.navigate(['/']);
    }
    else {

    }
  }

  ngOnInit() {
    this.servicio.getCreditsToPay().subscribe(data => {
      this.misCreditos = data["info"]
      //console.log(this.misCreditos);
    }, error => {
      this.matSnackBar.open('Ocurrió un error al momento de recuperar los registros, por favor, recargue la página', 'Aceptar', {
        duration: 3000,
      });
    });
  }

  debitar(idCredito, NumeroCuenta, MontoASolicitar, Nombre, idUsuario) {
    if (confirm("Desea efectuar el cobro de Q." + MontoASolicitar + " al usuario " + Nombre)) {

      this.servicio.payCredit({
        'idUsuario': idUsuario,
        'monto': MontoASolicitar,
        'cuenta': NumeroCuenta,
        'idCredito': idCredito,
        'descripcion': 'Cancelación de deuda por solicitud de crédito con el banco'
      }).subscribe(data => {

        //console.log(data);
        if (data['status'] == 'correcto') {
          this.matSnackBar.open('Prestamo cobrado correctamente', 'Aceptar', {
            duration: 2000,
          });
        }

      }, error => {
        this.matSnackBar.open('Ocurrió un error al momento de realizar el cobro, por favor intente de nuevo', 'Aceptar', {
          duration: 3000,
        });
      });

    }
  }

  debitar2() {

    if (this.cuentaInput == undefined || this.montoInput == undefined || this.descripcionInput == undefined) {
      this.matSnackBar.open('No puede dejar campos en blanco para realizar esta operación', 'Aceptar', {
        duration: 2000,
      });
    }
    else {
      this.servicio.getBalance({
        'monto': this.montoInput,
        'idCuenta': this.cuentaInput
      }).subscribe(data => {

        if (data['status'] == 'correcto') {
          console.log(data['info'])

          if (data['info'][0]['posible_pagar'] == 1) {
            if (confirm("Cobrar Q." + this.montoInput + " a la cuenta No. " + this.cuentaInput)) {

              this.servicio.debitBalance({
                'monto': this.montoInput,
                'cuenta': this.cuentaInput,
                'idUsuario': data['info'][0]['idUsuario'],
                'descripcion': this.descripcionInput
              }).subscribe(data => {

                //console.log(data);
                if (data['status'] == 'correcto') {
                  this.matSnackBar.open('Débito realizado correctamente', 'Aceptar', {
                    duration: 2000,
                  });
                  this.cuentaInput = 0;
                  this.montoInput = 0;
                  this.descripcionInput = "";
                }

              }, error => {
                this.matSnackBar.open('Ocurrió un error al momento de realizar el cobro, por favor intente de nuevo', 'Aceptar', {
                  duration: 3000,
                });
              });

            }
          }
          else {
            this.matSnackBar.open('No es posible debitar la cantidad solicitada a la cuenta indicada', 'Aceptar', {
              duration: 2000,
            });
          }
          this.matSnackBar.open('Prestamo cobrado correctamente', 'Aceptar', {
            duration: 2000,
          });
        }

      }, error => {
        this.matSnackBar.open('Ocurrió un error al momento de realizar el cobro, por favor intente de nuevo', 'Aceptar', {
          duration: 3000,
        });
      });
    }

    /*
    if (confirm("Desea efectuar el cobro de Q." + MontoASolicitar + " al usuario " + Nombre)) {

      

    }*/
  }

}
