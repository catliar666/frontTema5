import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MuniecaPageComponent } from './pages/munieca-page/munieca-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { EditarPageComponent } from './pages/editar-page/editar-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';

const routes: Routes = [
  {
      path: '',
      component: LayoutPageComponent,
      children: [
        { path: 'nueva-munieca', component: NewPageComponent},
        { path: 'buscar',   component: SearchPageComponent},
        { path: 'editar/:id', component: EditarPageComponent},
        { path: 'todas',     component: ListPageComponent},
        { path: ':id',      component: MuniecaPageComponent},
        { path: '**',       redirectTo: 'todas'},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MuniecaRoutingModule { }