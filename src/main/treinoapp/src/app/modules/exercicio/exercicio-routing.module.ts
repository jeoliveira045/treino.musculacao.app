import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercicioComponent } from './exercicio.component';
import {ListComponent} from "./list/list.component";
import {FormComponent} from "./form/form.component";

const routes: Routes = [{


  path: '',
  children: [
    {
      path: 'list',
      component: ListComponent
    },
    {
      path: 'form',
      component: FormComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercicioRoutingModule { }
