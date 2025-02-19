import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MuniecaPageComponent } from './pages/munieca-page/munieca-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MuniecaRoutingModule } from './muniecas-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { EditarPageComponent } from './pages/editar-page/editar-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { MuniecaImagePipe } from './pipes/munieca-image.pipe';



@NgModule({
  declarations: [
    CardComponent,
    ConfirmDialogComponent,
    MuniecaPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    EditarPageComponent,
    SearchPageComponent,
    MuniecaImagePipe,
    NewPageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MuniecaRoutingModule
  ]
})
export class MuniecasModule { }
