import {Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TreinoService} from "../../../services/treino.service";
import {TreeNode} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AppDialog} from "../../../components/dialog.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit, OnDestroy{


  treinosList: Array<TreeNode> = new Array<TreeNode>()

  ref!: DynamicDialogRef

  fields = ['Descrição', 'Músculo']


  constructor(protected dialogService: DialogService,  protected treinoService: TreinoService) {

  }


  ngOnInit(){
    this.getAllTreinos()
  }

  ngOnDestroy(){
    if(this.ref){
      this.ref.close()
    }
  }

  getAllTreinos() {
    this.treinoService.findAll().subscribe((res: any) => {
        for (let item of res) {
          this.treinosList.push(item)
        }
      }
    )
  }

  showDialog(){
    this.ref = this.dialogService.open(AppDialog, {
      header:'Lista de exercicios',
      data: {
        objCollection: this.treinosList[0],
        fields: this.fields
      },
      width: '70%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    })
  }

}
