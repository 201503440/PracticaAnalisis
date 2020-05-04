import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  miUsuario:any;

  constructor(private matSnackBar: MatSnackBar,private router: Router) { }

  ngOnInit() {
    this.miUsuario = JSON.parse(localStorage.getItem("currentUser"))
    
    if ( this.miUsuario == null )
    {
      this.router.navigate(['/']);
    }
  }

  actionBoton()
  {
    /*
    console.log(this.miUsuario)
    this.matSnackBar.open('Debe de ingresar un correo electronico para ingresar', 'Aceptar', {
      duration: 2000,
    });*/
  }
  

}
