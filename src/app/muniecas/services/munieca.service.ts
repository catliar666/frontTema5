import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments.prod';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Munieca } from '../interfaces/munieca.interface';

@Injectable({providedIn: 'root'})
export class MuniecaService {
    
  private baseUrl = environments.baseURL

  constructor(private httpClient: HttpClient) { }

getMuniecas(): Observable<Munieca[]> {
  return this.httpClient.get<{ mensaje: string; personajes: any[] }>(`${this.baseUrl}/todos/`)
    .pipe(
      tap(response => console.log('API Response:', response)), // <-- Verificar respuesta
      map(response => {
        if (!response || !response.personajes) {
          console.warn('No se encontraron personajes en la respuesta.');
          return [];
        }
        return response.personajes.map(item => this.mapToMunieca(item));
      }),
      catchError(error => {
        console.error('Error fetching muniecas:', error);
        return of([]);
      })
    );
}

  
  getMuniecaById(id: string): Observable<Munieca | undefined> {
    return this.getMuniecas().pipe(
      map(muniecas => muniecas.find(m => m._id === id)),
      catchError(error => {
        console.error('Error obteniendo muñeca por ID:', error);
        return of(undefined);
      })
    );
  }

  getSuggestions(query: string): Observable<Munieca[]> {
    if (!query.trim()) return of([]);
    
    return this.getMuniecas().pipe(
      map(muniecas =>
        muniecas.filter(m =>
          m.Nombre.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
      ),
      catchError(error => {
        console.error('Error en la búsqueda:', error);
        return of([]);
      })
    );
  }
  

  addMunieca(munieca: Munieca): Observable<Munieca> {
  
    return this.httpClient.post<Munieca>(`${this.baseUrl}/crear/`, this.createPayload(munieca))
      .pipe(
        map(item => this.mapToMunieca(item)),
        catchError(error => {
          console.error('Error al agregar muñeca:', error);
          return throwError(() => new Error('No se pudo agregar la muñeca'));
        })
      );
  }
  
  updateMunieca(munieca: Munieca): Observable<Munieca> {
    if (!munieca._id) return throwError(() => new Error('El ID es requerido'));

    return this.httpClient.put<Munieca>(`${this.baseUrl}/editar/${munieca._id}/`, this.createPayload(munieca))
      .pipe(
        map(this.mapToMunieca),
        catchError(error => {
          console.error('Error al actualizar muñeca:', error);
          return throwError(() => new Error('No se pudo actualizar la muñeca'));
        })
      );
  }
  
  
  deleteMuniecaById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/eliminar/${id}/`)
      .pipe(
        map(() => true),
        catchError(error => {
          console.error('Error al eliminar muñeca:', error);
          return of(false);
        })
      );
  }
  
  private mapToMunieca(item: any): Munieca {
    return {
      _id: item._id,
      Nombre: item.Nombre,
      TipoDeMonstruo: item.TipoDeMonstruo,
      FechaDeLanzamiento: item.FechaDeLanzamiento,
      CiudadNatal: item.CiudadNatal,
      Edad: item.Edad,
      Foto: item.Foto
        };
    };

    private createPayload(munieca: Munieca) {
      return {
        _id: munieca._id,
        Nombre: munieca.Nombre,
        TipoDeMonstruo: munieca.TipoDeMonstruo,
        FechaDeLanzamiento: munieca.FechaDeLanzamiento,
        CiudadNatal: munieca.CiudadNatal,
        Edad: munieca.Edad,
        Foto: munieca.Foto
      };
    }
  }