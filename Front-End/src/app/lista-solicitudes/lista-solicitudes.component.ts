import { Component, OnInit } from '@angular/core';
import { RequestCreditService } from '../Services/request-credit.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { InicioComponent } from '../inicio/inicio.component'


@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent implements OnInit {

  miUsuario: any;

  misSolicitudes: any;

  constructor(public padre:InicioComponent,private matSnackBar: MatSnackBar,private servicio: RequestCreditService,private router: Router) {
    this.padre.cambiarSeleccion3();

    this.miUsuario = JSON.parse(localStorage.getItem("currentUser"))
    if (this.miUsuario == null) {
      this.router.navigate(['/']);
    }
    else
    {

    }

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
