import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Models/usuario';
import { ServLoginService } from '../Services/serv-login.service';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.css']
})
export class LoguinComponent implements OnInit {

  constructor(private serv: ServLoginService) { }

  ngOnInit() {
    localStorage.removeItem('currentUser');
  }

  login(event){    
    event.preventDefault()
    const target = event.target    
    let usuarioLogin: Usuario;
    usuarioLogin = {      
      idUsuario: target.querySelector('#codigousuario').value,
      Nombre: "",      
      UserName: target.querySelector('#username').value,
      Password: target.querySelector('#password').value,
      Correo: ""
    }
    this.serv.loginPost(usuarioLogin);
    target.querySelector('#codigousuario').value = ''
    target.querySelector('#username').value = ''
    target.querySelector('#password').value = ''
  }

}