import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private matSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  actionBoton()
  {
    this.matSnackBar.open('Debe de ingresar un correo electronico para ingresar', 'Aceptar', {
      duration: 2000,
    });
  }
  

}
