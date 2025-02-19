import { Component } from '@angular/core';
import { Munieca } from '../../interfaces/munieca.interface';
import { MuniecaService } from '../../services/munieca.service';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {

  public muniecas: Munieca[] = [];

  constructor( private muniecaService: MuniecaService){}

  ngOnInit(): void {
    this.muniecaService.getMuniecas()
      .pipe(catchError(() => of([])))
      .subscribe((muniecas) => {
        this.muniecas = muniecas;
      });
  }
  

}
