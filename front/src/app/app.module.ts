import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './widgets/weather/weather.component';
import { DateComponent } from './widgets/date/date.component';
import { registerLocaleData } from '@angular/common';
import { AnalogClockComponent } from './widgets/analog-clock/analog-clock.component';
import { HttpClientModule } from '@angular/common/http';
import { DigitalClockComponent } from './widgets/digital-clock/digital-clock.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    DateComponent,
    AnalogClockComponent,
    DigitalClockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
