import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MirrorComponent } from './mirror/mirror.component';
import { AuthenticationComponent } from './website/authentication/authentication.component';
import { WifiSettingsComponent } from './website/wifi-settings/wifi-settings.component';
import { HomeComponent } from './website/home/home.component';
import { RegisterComponent } from './website/register/register.component';
import { UserComponent } from './website/user/user.component';
import { WidgetPageComponent } from './website/widget-page/widget-page.component';


const routes: Routes = [
	{ path: '', redirectTo: 'mirror', pathMatch: 'full' },
	{ path: 'mirror', component: MirrorComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: AuthenticationComponent },
	{ path: 'settings', component: WifiSettingsComponent },
	{ path: 'user/:id', component: UserComponent /*, canActivate: [AuthGuard]*/},
	{ path: 'widget-page/:id', component: WidgetPageComponent},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
