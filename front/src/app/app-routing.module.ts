import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MirrorComponent } from './mirror/mirror.component';
import { AuthenticationComponent } from './website/authentication/authentication.component';
import { HomeComponent } from './website/home.component';
import { RegisterComponent } from './website/register/register.component';
import { UserComponent } from './website/user/user.component';

const routes: Routes = [
	{ path: '', redirectTo: 'mirror', pathMatch: 'full' },
	{ path: 'mirror', component: MirrorComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: AuthenticationComponent },
	{ path: 'user', component: UserComponent, /*canActivate: [AuthGuard]*/},
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
