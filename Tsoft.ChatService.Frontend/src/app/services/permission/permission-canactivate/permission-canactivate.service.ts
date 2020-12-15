import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UrlPermission } from '../../../helpers/UserRightUrlMapping'
import { UserRightService } from '../../systems';

@Injectable({
  providedIn: 'root'
})
export class PermissionCanactivateService implements CanActivate {
  constructor(private userRightService: UserRightService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let role: boolean = false;
    const userRightUrl: any = UrlPermission;
    let detailUrl: any = {};
    for (const dataUrlRight of userRightUrl) {
      if (state.url.indexOf(dataUrlRight.url) > -1) {
        detailUrl = dataUrlRight;
        break;
      }
    }
    role = this.userRightService.check(detailUrl.codeRight);
    if (!role) {
      this.router.navigate(['**']);
      return false;
    }
    return role;
  }

}
