import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TransferenciaService } from '../Services/transferencia.service';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.css']
})
export class TransferenciasComponent implements OnInit {

  constructor(private matSnackBar: MatSnackBar,
              private transService: TransferenciaService) { }

  ngOnInit() {
  }

  transferir(event){    
    event.preventDefault()
    const target = event.target    
        
    if (Number.isInteger(target.querySelector('#cuentadestino').value)) {
      target.querySelector('#cuentadestino').value = ''
      this.matSnackBar.open('Cuenta destino solo puede ser entero!', 'Aceptar', {
        duration: 2000,
      });
      return
    }
    
    var decimal=  /^[-+]?[0-9]+\.[0-9]+$/; 
    if(!(target.querySelector('#monto').value).match(decimal)) { 
      target.querySelector('#monto').value = ''
      this.matSnackBar.open('Monto debe ser decimal!', 'Aceptar', {
        duration: 2000,
      });
      return
    }
    
    const cuenta: number  = target.querySelector('#cuentadestino').value;
    const monto: number = target.querySelector('#monto').value;

    this.transService.Saldo(cuenta, monto);

    target.querySelector('#cuentadestino').value = ''
    target.querySelector('#monto').value = ''
  }

}
