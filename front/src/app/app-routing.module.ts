import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MirrorComponent } from './mirror/mirror.component';
import { AuthenticationComponent } from './website/authentication/authentication.component';
import { HomeComponent } from './website/home.component';

const routes: Routes = [
	{ path: '', redirectTo: 'mirror', pathMatch: 'full' },
	{ path: 'mirror', component: MirrorComponent },
	{ path: 'home', component: HomeComponent },
	// { path: 'register', component: HomeComponent },
	{ path: 'login', component: AuthenticationComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
