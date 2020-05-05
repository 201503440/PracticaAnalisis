import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoguinComponent } from './loguin/loguin.component';
import { SolCreditoComponent } from './sol-credito/sol-credito.component';

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
      { path: 'solicitar-credito', component: SolCreditoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
