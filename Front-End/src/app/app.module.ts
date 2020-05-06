import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoguinComponent } from './loguin/loguin.component';

import { SolCreditoComponent } from './sol-credito/sol-credito.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';

import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEsGT from '@angular/common/locales/es-GT';

registerLocaleData(localeEsGT, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoguinComponent,
    SolCreditoComponent,
    ListaSolicitudesComponent,
    DetalleSolicitudComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-Ar' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
