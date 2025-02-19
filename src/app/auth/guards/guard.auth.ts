import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{
    constructor(private authService:AuthService, private router:Router) { }
    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
        console.log('Can Match');
        console.log({ route, segments});
    
        return this.checkAuthStatus();  
      }
     
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        console.log('Can Activate');
        console.log({ route, state});
    
        return  this.checkAuthStatus();
      }
      

      public checkAuthStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuthentication()
          .pipe(
            tap(isAuthenticated => {
              if (isAuthenticated) {
                this.router.navigate(['./']);
              }
            }),
            map(isAuthenticated => !isAuthenticated)
          );
      }
      
    
    
    
}