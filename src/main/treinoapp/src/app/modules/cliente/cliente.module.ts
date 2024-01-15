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
    MessagesModule
  ]
})
export class ClienteModule { }
