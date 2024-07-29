import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './core-module/guards/auth.guard';
import { ApplicationErrorComponent } from './components/application-error/application-error.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'main',
    canActivate: [AuthGuard], // for direct hit url then page not open
    loadChildren: () =>
      import('./modules/main.module').then(
        (m) => m.MainModule
      ),
  },
  // {
  //   path: 'example',
  //   loadChildren: () => import('./modules/example/example.module').then((m) => m.ExampleModule),
  // },

  //{ path: '**', component: NotFoundComponent },
  { path: '**', component: ApplicationErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
