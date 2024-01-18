import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExercicioService} from "../../../services/exercicio.service";
import {MessageService, TreeNode} from "primeng/api";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  exerciciosList: Array<any> = new Array<any>();

  isVisible: boolean = false;

  @ViewChild('message') message: ElementRef;

  constructor(protected exercicioService: ExercicioService, protected messageService: MessageService){

  }
  ngOnInit(){
    this.getAllExercicios();
  }

  getAllExercicios(){
    return this.exercicioService.findAll().subscribe(results => {
      this.exerciciosList = results
    })
  }

  deleteCliente(e: number){
    this.exercicioService.delete(e).subscribe({
      next: ()=>{
        this.exerciciosList = this.exerciciosList.filter((data) => data.id !== e)
        this.messageService.add({severity: 'success', summary: 'Informação: ', detail:'O item foi deletado'});
      },
      error: (err: any) => {
        this.isVisible = true
        this.message.nativeElement.textContent = err.error.trace
      }
    })
  }

}
