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
      console.log(this.misCreditos);
    }, error => {
      this.matSnackBar.open('Ocurrió un error al momento de recuperar los registros, por favor, recargue la página', 'Aceptar', {
        duration: 3000,
      });
    });
  }

  debitar(idCredito, NumeroCuenta, MontoASolicitar, Nombre) {
    if (confirm("Desea efectuar el cobro de Q." + MontoASolicitar + " al usuario " + Nombre)) {

      this.servicio.payCredit({
        'monto': MontoASolicitar,
        'cuenta': NumeroCuenta,
        'idCredito': idCredito
      }).subscribe(data => {

        console.log(data);
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

}
