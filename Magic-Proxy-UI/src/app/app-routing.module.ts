import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagicAuthComponent } from './pages/magic-auth/magic-auth.component';
import { MagicPanelComponent } from './pages/magic-panel/magic-panel.component';

const routes: Routes = [
  { path: 'login', component: MagicAuthComponent },
  { path: 'panel', component: MagicPanelComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
