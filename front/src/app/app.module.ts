import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeteoComponent } from './widgets/meteo/meteo.component';
import { DateComponent } from './widgets/date/date.component';
import { registerLocaleData } from '@angular/common';
import { AnalogClockComponent } from './widgets/analog-clock/analog-clock.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    DateComponent,
    AnalogClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
