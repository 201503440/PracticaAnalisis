import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestCreditService } from '../Services/request-credit.service'
import { Router } from "@angular/router";
import { InicioComponent } from '../inicio/inicio.component'

@Component({
  selector: 'app-sol-credito',
  templateUrl: './sol-credito.component.html',
  styleUrls: ['./sol-credito.component.css']
})
export class SolCreditoComponent implements OnInit {

  miUsuario: any;

  monto = 100;
  descripcion: "";

  constructor(public padre:InicioComponent, private matSnackBar: MatSnackBar, private servicio: RequestCreditService, private router: Router) {
    this.padre.cambiarSeleccion2();
   }

  ngOnInit() {

    this.miUsuario = JSON.parse(localStorage.getItem("currentUser"))

    if (this.miUsuario == null) {
      this.router.navigate(['/']);
    }

  }

  solicitar() {
    if (this.monto >= 100 && this.descripcion != undefined) {
      this.servicio.requestCredit({
        'monto': this.monto,
        'descripcion':this.descripcion,
        'cuenta':this.miUsuario['idCuenta'],
        'usuario':this.miUsuario['idUsuario']
      }).subscribe(data => {
  
        console.log(data);
        if ( data['status'] == 'correcto' )
        {
          this.matSnackBar.open('Prestamo solicitado correctamente', 'Aceptar', {
            duration: 2000,
          });
          this.monto = 100;
          this.descripcion = "";
        }
   
      }, error => {
        this.matSnackBar.open('Ocurrió un error al momento de ingresar su solicitud, por favor intente de nuevo', 'Aceptar', {
          duration: 3000,
        });
      });
      
    }
    else {
      this.matSnackBar.open('Debe llenar todos los campos si desea solicitar un crédito monetario', 'Aceptar', {
        duration: 2500,
      });
    }
  }

}
