import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MirrorComponent } from './mirror/mirror.component';
import { WebsiteComponent } from './website/website.component';

const routes: Routes = [
  {path: 'mirror', component: MirrorComponent},
  {path: 'welcome', component: WebsiteComponent},
  {path: '', redirectTo: 'mirror', pathMatch: 'full'},
  {path: '**', redirectTo: 'mirror'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
