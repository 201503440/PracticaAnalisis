import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from '../Models/usuario';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServLoginService {

  constructor(private http: HttpClient,
              private matSnackBar: MatSnackBar,
              private router: Router) { }

  url_login = 'http://localhost:3000/login';

  loginPost(usuario: Usuario){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control': 'no-cache'
      })
    };
    let final = (JSON.stringify(usuario));

    return this.http.post(this.url_login, final, httpOptions).subscribe((data) => {   
      if (Object.values(data)[0] === 0) {
        //AQUI LOS DATOS NO SON VALIDOS
        this.matSnackBar.open('DATOS NO VALIDOS.!', 'Aceptar', {
          duration: 2000,
        });
      } else {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['/index']);
      }

      });
  }

}
