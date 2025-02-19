import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments.prod';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl = environments.baseURL;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    return this.user ? structuredClone(this.user) : undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<{ mensaje: string; usuarios: User[] }>(`${this.baseUrl}/usuarios/`)
      .pipe(
        map((response) => {
          console.log(response.usuarios); // Verifica que los usuarios están llegando correctamente
          
          const userFound = response.usuarios.find(u => u.email === email && u.password === password);
          
          if (!userFound) {
            throw new Error('Credenciales incorrectas');
          }
  
          this.user = userFound;
          localStorage.setItem('token', userFound._id.toString()); // Guardar el ID del usuario en localStorage
  
          return userFound;
        })
      );
  }
  
  
  
  logout(): void {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  checkAuthentication(): Observable<boolean> {
    const userLocalStorage = localStorage.getItem('user');
    if (!userLocalStorage) {
      return of(false);
    }

    try {
      const userParsed = JSON.parse(userLocalStorage) as User;
      this.user = userParsed;
      return of(true);
    } catch (error) {
      return of(false);
    }
  }
}