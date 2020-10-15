import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './widgets/weather/weather.component';
import { DateComponent } from './widgets/date/date.component';
import { registerLocaleData } from '@angular/common';
import { AnalogClockComponent } from './widgets/analog-clock/analog-clock.component';
import { HttpClientModule } from '@angular/common/http';
import { DigitalClockComponent } from './widgets/digital-clock/digital-clock.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgendaComponent } from './widgets/agenda/agenda.component';
import { NewsComponent } from './widgets/news/news.component';
import { WeatherForecastComponent } from './widgets/weather-forecast/weather-forecast.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    DateComponent,
    AnalogClockComponent,
    DigitalClockComponent,
    AgendaComponent,
    NewsComponent,
    WeatherForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
