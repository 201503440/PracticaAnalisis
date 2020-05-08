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
import { SignUpComponent } from './sign-up/sign-up.component';
import { ListaSolicitudesComponent } from './lista-solicitudes/lista-solicitudes.component';
import { DetalleSolicitudComponent } from './detalle-solicitud/detalle-solicitud.component';

import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEsGT from '@angular/common/locales/es-GT';
import { TransferenciasComponent } from './transferencias/transferencias.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultarComponent } from './consultar/consultar.component';
import { DebitarDineroComponent } from './debitar-dinero/debitar-dinero.component';

registerLocaleData(localeEsGT, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoguinComponent,
    SolCreditoComponent,
    SignUpComponent,
    ListaSolicitudesComponent,
    DetalleSolicitudComponent,
    TransferenciasComponent,
    ConsultarComponent,
    DebitarDineroComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-Ar' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
