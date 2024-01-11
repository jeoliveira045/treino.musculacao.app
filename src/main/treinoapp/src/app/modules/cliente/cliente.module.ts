import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ClienteComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
