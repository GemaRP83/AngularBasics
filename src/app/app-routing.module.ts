import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'admin',
    //en lugar de cargar los hijos aquí, los hemos pasado al adminModule y aquí hacemos una importación dinámica
    loadChildren: () =>
      import('./admin/admin.module').then((x) => x.AdminModule) 
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'admin'
  },
  {
    path: '**',
    redirectTo: 'admin'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
