import {Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TreinoService} from "../../../services/treino.service";
import {MessageService, TreeNode} from "primeng/api";
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

  isVisible: boolean = false;

  @ViewChild('message') message: ElementRef;

  constructor(protected dialogService: DialogService,  protected treinoService: TreinoService, protected messageService: MessageService) {
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

  deleteTreino(e: number){
    this.treinoService.delete(e).subscribe({
      next: ()=>{
        this.treinosList = this.treinosList.filter((data: any) => data.id !== e)
        this.messageService.add({severity: 'success', summary: 'Informação: ', detail:'O item foi deletado'});
      },
      error: (err: any) => {
        this.isVisible = true
        this.message.nativeElement.textContent = err.error.trace
      }
    })
  }

}
