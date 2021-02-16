import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherCurrentComponent } from './widgets/weather-current/weather-current.component';
import { DateComponent } from './widgets/date/date.component';
import { registerLocaleData } from '@angular/common';
import { AnalogClockComponent } from './widgets/analog-clock/analog-clock.component';
import { HttpClientModule } from '@angular/common/http';
import { DigitalClockComponent } from './widgets/digital-clock/digital-clock.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgendaComponent } from './widgets/agenda/agenda.component';
import { NewsComponent } from './widgets/news/news.component';
import { WeatherForecastComponent } from './widgets/weather-forecast/weather-forecast.component';
import { AlmanacComponent } from './widgets/almanac/almanac.component';
import { WeatherWeekendComponent } from './widgets/weather-weekend/weather-weekend.component';
import { MirrorComponent } from './mirror/mirror.component';
import { WebsiteComponent } from './website/website.component';
import { AuthenticationComponent } from './website/authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { WebsiteBarComponent } from './website/website-bar/website-bar.component';
import { RegisterComponent } from './website/register/register.component';

registerLocaleData(localeFr);

@NgModule({
	declarations: [
		AppComponent,
		WeatherCurrentComponent,
		DateComponent,
		AgendaComponent,
		AnalogClockComponent,
		DigitalClockComponent,
		NewsComponent,
		WeatherForecastComponent,
		WeatherWeekendComponent,
    	AlmanacComponent,
    	MirrorComponent,
    	WebsiteComponent,
		AuthenticationComponent,
		WebsiteBarComponent,
		RegisterComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		MatProgressSpinnerModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatToolbarModule,
	],
	providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
