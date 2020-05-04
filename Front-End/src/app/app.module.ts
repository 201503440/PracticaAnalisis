import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoguinComponent } from './loguin/loguin.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoguinComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
