import {Component, Input, OnInit} from "@angular/core";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector:'app-dialog',
  template:`
    <p-table [value]="objCollection"  responsiveLayout="scroll" [responsive]="true">
      <ng-template pTemplate="header">
        <tr>
          <th *ngFor="let field of fields">{{field}}</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-item>
        <tr>
          <td>{{item.descricao}}</td>
          <td>{{item.musculo}}</td>
        </tr>
      </ng-template>
    </p-table>
  `
})
export class AppDialog implements OnInit{

  constructor(public dynamicDialogRef: DynamicDialogRef, protected dynamicDialogConfig: DynamicDialogConfig){

  }
  objCollection = new Array<any>()

  fields = new Array<any>()

  ngOnInit(){
    this.objCollection = this.dynamicDialogConfig.data.objCollection['exercicios']
    this.fields = this.dynamicDialogConfig.data.fields
  }

}
