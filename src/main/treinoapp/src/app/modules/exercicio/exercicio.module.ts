import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercicioRoutingModule } from './exercicio-routing.module';
import { ExercicioComponent } from './exercicio.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    ExercicioComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ExercicioRoutingModule
  ]
})
export class ExercicioModule { }
