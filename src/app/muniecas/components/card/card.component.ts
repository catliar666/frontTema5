import { Component, Input } from '@angular/core';
import { Munieca } from '../../interfaces/munieca.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  public munieca!: Munieca;

  ngOnInit(): void {
    if (!this.munieca) throw new Error('Value is required.');
  }

}
