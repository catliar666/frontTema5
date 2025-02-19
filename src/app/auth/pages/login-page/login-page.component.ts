import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Creamos el FormGroup y FormControls para email y password
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


//  onLogin():void{
//     this.authService.login('martosman@gmail.com','1234')
//     .subscribe( user => {
//       this.router.navigate(['/']);
//     }
//     )
//   }

onLogin(): void {
  const { email, password } = this.loginForm.value;
  this.authService.login(email, password)
    .subscribe({
      next: user => {
        console.log('Logueado:', user);
        this.router.navigate(['/']);
      },
      error: err => {
        console.error(err);
        alert('Usuario/contraseña incorrectos.');
      }
    });
}


}
