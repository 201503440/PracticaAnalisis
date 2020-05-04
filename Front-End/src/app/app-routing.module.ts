import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { LoguinComponent } from './loguin/loguin.component';

const routes: Routes = [
  {
    path: '',
    component: LoguinComponent
  },
  { 
		path:  'index', 
		component:   InicioComponent,
		pathMatch:  'full' 
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
