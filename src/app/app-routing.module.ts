import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/guard.auth';
import { PublicGuard } from './auth/guards/public.auth';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import ('./auth/auth.module').then( m => m.AuthModule),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ],
  },
  {
    path:'muniecas',
    loadChildren: () => import ('./muniecas/muniecas.module').then( m => m.MuniecasModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ],
  },
  {
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo: 'muniecas',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
