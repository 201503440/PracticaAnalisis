import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoguinComponent } from './loguin/loguin.component';
import { SolCreditoComponent } from './sol-credito/sol-credito.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';
import { TransferenciasComponent } from './transferencias/transferencias.component';
import { ConsultarComponent } from './consultar/consultar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'index',
    redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoguinComponent
  },
  {
    path: 'principal',
    component: InicioComponent,
    children: [
      { path: 'solicitar-credito', component: SolCreditoComponent },
      { path: 'gestionar-solicitudes', component: ListaSolicitudesComponent },
      { path: 'detalle-solicitud/:id', component: DetalleSolicitudComponent },
      { path: 'transferencias', component: TransferenciasComponent },
      { path: 'saldo', component: ConsultarComponent }
    ]
  },
  { 
		path:  'index', 
		component:   InicioComponent,
		pathMatch:  'full' 
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
