import { Component } from '@angular/core';
import { Munieca } from '../../interfaces/munieca.interface';
import { FormControl } from '@angular/forms';
import { MuniecaService } from '../../services/munieca.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  public searchInput = new FormControl('');

  public muniecas: Munieca[] = [];

  public seletecHero?: Munieca;

  constructor ( private muniecaService:MuniecaService){

  }

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.muniecaService.getSuggestions(value)
      .subscribe(muniecas => this.muniecas = muniecas);

  }

  onSelectedOption(event:MatAutocompleteSelectedEvent){
    if (!event.option.value){
      this.seletecHero = undefined
      return
    }
    const munieca: Munieca = event.option.value;
    this.searchInput.setValue ( munieca.Nombre);
    this.seletecHero = munieca;

  }

}
