import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreinoRoutingModule } from './treino-routing.module';
import { TreinoComponent } from './treino.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import {TreeTableModule} from "primeng/treetable";
import {AppDialog} from "../../components/dialog.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    TreinoComponent,
    ListComponent,
    FormComponent,
    AppDialog
  ],
  imports: [
    CommonModule,
    TreinoRoutingModule,
    TableModule,
    HttpClientModule,
    TreeTableModule,
    ButtonModule
  ],
  providers:[
    DialogService,
    DynamicDialogRef
  ]
})
export class TreinoModule { }
