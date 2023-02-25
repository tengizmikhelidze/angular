import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from '../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppConfigService, InitConfig } from '@app-core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const Imports = [
  BrowserModule,
  AppRoutingModule,
  NavigationBarComponent,
  FontAwesomeModule,
];

const Declarations = [AppComponent];

@NgModule({
  declarations: [...Declarations],
  imports: [...Imports, BrowserAnimationsModule],
  providers: [
    Location,
    {
      provide: APP_INITIALIZER,
      useFactory: InitConfig,
      deps: [AppConfigService],
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
