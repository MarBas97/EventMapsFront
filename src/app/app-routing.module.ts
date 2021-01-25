import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const mapModule = () => import('./maps/maps.module').then(x => x.MapsModule);

const routes: Routes = [
    { path: 'maps', loadChildren: mapModule, canActivate: [AuthGuard]},
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: 'maps/main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
