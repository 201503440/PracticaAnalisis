import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  seleccion1:boolean = false;
  seleccion2:boolean = false;
  seleccion3:boolean = false;

  anterior : boolean = false;

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

  cambiarSeleccion1()
  {
    this.seleccion1=true;
  }

  cambiarSeleccion2()
  {
    this.seleccion2=true;
  }

  cambiarSeleccion3()
  {
    this.seleccion3=true;
  }

  ponerFalso(val1, val2, val3)
  {
    this.seleccion1 = val1;
    this.seleccion2 = val2;
    this.seleccion3 = val3;
  }
  

}
