import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild, Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  token!: string | null;

  constructor(
    private router: Router,
    private authService: AuthService,
    ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUrl(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  checkUrl(url: string): boolean {
    this.token = localStorage.getItem('jwt_token');

    if (this.token) {
      this.authService.setUserLogged();

      if (url === '/login' || url === '/signup') {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    } else {
      this.authService.setUserLogOut();

      if (url === '/login' || url === '/signup') {
        return true;
      } else {
        this.router.navigate(['/login']);

        return false;
      }
    }
  }
}
