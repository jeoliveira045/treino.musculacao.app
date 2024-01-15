import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {MultiSelectModule} from "primeng/multiselect";
import {ClienteService} from "../../services/cliente.service";
import {ExercicioService} from "../../services/exercicio.service";


@NgModule({
  declarations: [
    ClienteComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    MessagesModule,
    MultiSelectModule
  ], providers:[
    ClienteService,
    ExercicioService
  ]
})
export class ClienteModule { }
