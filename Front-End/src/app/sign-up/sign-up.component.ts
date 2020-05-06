import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { SignUpService } from '../Services/sign-up.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private servSignUp: SignUpService,
             private matSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  signup(event){
    
    event.preventDefault()
    const target = event.target    

    //VALIDAR CONTRASEÑAS SE PARECEN
    if (!(target.querySelector('#password').value === target.querySelector('#password2').value)) {
      this.matSnackBar.open('CONTRASEÑAS DEBEN COINCIDIR.!', 'Aceptar', {
        duration: 2000,
      });
      return
    }

    let usuarioSignUp: Usuario;
    usuarioSignUp = {      
      idUsuario: 0,
      Nombre: target.querySelector('#nombre').value,
      UserName: target.querySelector('#username').value,
      Password: target.querySelector('#password').value,
      Correo: target.querySelector('#email').value
    }
    this.servSignUp.signupMethod(usuarioSignUp);
    target.querySelector('#nombre').value = ''
    target.querySelector('#username').value = ''
    target.querySelector('#email').value = ''
    target.querySelector('#password2').value = ''
    target.querySelector('#password').value = ''
  }

}