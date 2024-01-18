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
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";


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
        ButtonModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        MultiSelectModule,
        MessagesModule,
        DialogModule
    ],
  providers:[
    DialogService,
    DynamicDialogRef,
    MessageService
  ]
})
export class TreinoModule { }
