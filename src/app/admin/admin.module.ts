import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


//Containers
import { DonutListComponent } from './containers/donut-list/donut-list.component';
import { DonutSingleComponent } from './containers/donut-single/donut-single.component';

//Components
import { DonutCardComponent } from './components/donut-card/donut-card.component';
import { DonutFormComponent } from './components/donut-form/donut-form.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [  
    {path: 'donuts', component: DonutListComponent},
    {path:'donuts/new', component: DonutSingleComponent, data: {isEdit: false}}, 
    {path:'donuts/:id', component: DonutSingleComponent, data: {isEdit: true}}, 
    {path: '', pathMatch: 'full', redirectTo: 'donuts'}
];

@NgModule({
  declarations: [
    DonutListComponent,
    DonutCardComponent,
    DonutSingleComponent,
    DonutFormComponent
  ],
  //y quitamos el HttpModule de aquí y lo importamos en el app.module
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
   //ya no necesitamos exportar los componentes aquí al crear las rutas
  //exports:[DonutListComponent, DonutSingleComponent]
})
export class AdminModule { }
