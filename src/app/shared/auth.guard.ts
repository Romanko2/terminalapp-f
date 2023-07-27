import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorService } from './behavior.service';
import { AuthService } from '../utils/services/auth.service';



@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _bs:BehaviorService,
    private authService:AuthService
  ) {}

  token:any

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.token = this._bs.getLocalUser()
    this.token = this.authService.getToken()
     
    if (this.token) {
      // console.log("token",token);   
      // authorised so return true
      return true;
    }
    // not logged in so redirect to landing page 
    this.router.navigate(['/auth/login']);
    return false;
  }
}
