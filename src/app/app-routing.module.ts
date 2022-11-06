import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './features/dasboard/dashboard.component';
import { ErrorComponent } from './core/error/error.component';
import { AuthGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./auth/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'board/:id/:name',
        loadChildren: () =>
          import('./features/board/board.module').then((m) => m.BoardModule),
      },
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
