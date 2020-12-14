import { CallbackComponent } from './callback/callback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutProComponent } from '@brand';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
// single pages
import { PermissionCanactivateService } from '../services/permission/permission-canactivate/permission-canactivate.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutProComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'user-manager',
        loadChildren: () => import('./user-manager/user-manager.module').then(m => m.UserManagerModule),
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer-manager/customer-manager.module').then(m => m.CustomerManagerModule),
      },

      // Exception
      {
        path: 'exception',
        // loadChildren: './exception/exception.module#ExceptionModule',
        loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule),
      },

    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: 'Đăng nhập', titleI18n: 'app.login.login' },
      },
    ],
  },
  // Single page not wrapped Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
