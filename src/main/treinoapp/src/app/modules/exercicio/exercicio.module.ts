import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercicioRoutingModule } from './exercicio-routing.module';
import { ExercicioComponent } from './exercicio.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import {ExercicioService} from "../../services/exercicio.service";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {TreeModule} from "primeng/tree";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    ExercicioComponent,
    ListComponent,
    FormComponent
  ],
  providers:[ExercicioService],
    imports: [
      CommonModule,
      ExercicioRoutingModule,
      TableModule,
      ButtonModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
      DropdownModule
    ]
})
export class ExercicioModule { }
