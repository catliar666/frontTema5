import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  constructor(private authService:AuthService, private router:Router){}

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './todas'},
    { label: 'Añadir', icon: 'add', url: './nueva-munieca'},
    { label: 'Buscar', icon: 'search', url: './buscar'},
  ]

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }


  get user():User | undefined{
    return this.authService.currentUser;
  }

}
