import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MuniecaService } from '../../services/munieca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs';
import { Munieca } from '../../interfaces/munieca.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-editar-page',
  templateUrl: './editar-page.component.html',
  styleUrl: './editar-page.component.css'
})
export class EditarPageComponent {


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
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private snackbar: MatSnackBar,
  private dialog: MatDialog){}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.muniecaService.getMuniecaById(id)),
        tap(munieca => {
          if (!munieca) {
            this.router.navigateByUrl('/');
            return;
          }
          this.muniecaForm.patchValue(munieca);
        })
      )
      .subscribe();
  }
  

  showSnackbar ( message: string):void {
    this.snackbar.open ( message, 'done',{
      duration: 2500,
    })
  }



  onSubmit():void {

    if (this.muniecaForm.invalid) return;

    if (this.currentMunieca._id){
      this.muniecaService.updateMunieca(this.currentMunieca)
      .subscribe(hero => { this.showSnackbar(`${hero.Nombre} updated!`)})
      return;
    }
    this.muniecaService.addMunieca(this.currentMunieca)
      .subscribe(munieca =>{ 
        this.router.navigate(['/muniecas/editar', munieca._id]);
      this.showSnackbar(`${munieca.Nombre} created!`)})

    console.log({
      formIsValid: this.muniecaForm.valid,
      value: this.muniecaForm.value,
    });

  }
  get currentMunieca(): Munieca{
    const hero = this.muniecaForm.value as Munieca;

    return hero;
  }

  onDeleteHero(){
    if ( !this.currentMunieca._id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: this.muniecaForm.value}
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( !result ) return;

      this.muniecaService.deleteMuniecaById( this.currentMunieca._id )
      .subscribe ( wasDeleted =>{
        if ( wasDeleted )
          this.router.navigate(['/heroes'])
      })

    });

    dialogRef.afterClosed()
    .pipe(
      filter ((result:boolean) => result),
      switchMap( () => this.muniecaService.deleteMuniecaById( this.currentMunieca._id) ),
      filter ( (wasDeleted:boolean)=>wasDeleted),
      tap ( wasDeleted => console.log({wasDeleted})
      )
    ).subscribe(result => {
      this.router.navigate(['/heroes'])
    })



  }

}
