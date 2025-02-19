import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MuniecaService } from '../../services/munieca.service';
import { Munieca } from '../../interfaces/munieca.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {

  public muniecaForm = new FormGroup({
    _id: new FormControl<string | null>(null, { nonNullable: true }),
    Nombre: new FormControl<string>('', { nonNullable: true }),
    TipoDeMonstruo: new FormControl<string>('', { nonNullable: true }),
    FechaDeLanzamiento: new FormControl<string>('', { nonNullable: true }),
    CiudadNatal: new FormControl<string | null>(null),
    Edad: new FormControl<number | null>(null, { nonNullable: true }),
    Foto: new FormControl<string | null>(null),
  });

  constructor(
    private muniecaService: MuniecaService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Done', { duration: 2500 });
  }

  onSubmit(): void {
    if (this.muniecaForm.invalid) return;

    const nuevaMunieca = this.muniecaForm.value as Munieca;

    this.muniecaService.addMunieca(nuevaMunieca).subscribe(munieca => {
      this.router.navigate(['/muniecas/todas']);
      this.showSnackbar(`${munieca.Nombre} creada con éxito!`);
    });

    console.log({
      formIsValid: this.muniecaForm.valid,
      value: this.muniecaForm.value,
    });
  }
}

