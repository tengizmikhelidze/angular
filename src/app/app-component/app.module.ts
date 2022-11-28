import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from '../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const Imports = [
  BrowserModule,
  AppRoutingModule,
  NavigationBarComponent,
  FontAwesomeModule,
];

const Declarations = [AppComponent];

@NgModule({
  declarations: [...Declarations],
  imports: [...Imports],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
