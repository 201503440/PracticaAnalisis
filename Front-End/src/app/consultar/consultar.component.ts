import { Component, OnInit } from '@angular/core';
import { SaldoService } from '../Services/saldo.service';
import { InicioComponent } from '../inicio/inicio.component'

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  saldo: any = 0;

  constructor(public padre: InicioComponent,private saldoS: SaldoService) {
    this.padre.cambiarSeleccion6();
   }

  ngOnInit() {
    this.saldoS.getSaldo().subscribe((data) => { 
      if (Object.values(data)[0] === 1) {
        //AQUI TIENE SALDO
        this.saldo = Object.values(data)[1];
      } else {
        //AQUI NO TIENE SALDO        
        this.saldo = 0;  
      }
    });
  }

}
