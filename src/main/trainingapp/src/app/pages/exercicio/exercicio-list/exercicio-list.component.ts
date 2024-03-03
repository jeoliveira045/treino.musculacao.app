import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {MessagesModule} from "primeng/messages";
import {DialogModule} from "primeng/dialog";
import {ExercicioService} from "../../../services/exercicio.service";
import {MessageService} from "primeng/api";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-exercicio-list',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    MessagesModule,
    DialogModule,
    RouterLink
  ],
  providers:[
    MessageService,
    ExercicioService
  ],
  templateUrl: './exercicio-list.component.html',
  styleUrl: './exercicio-list.component.scss'
})
export class ExercicioListComponent implements OnInit{
  exerciciosList: Array<any> = new Array<any>();

  isVisible: boolean = false;

  @ViewChild('message') message!: ElementRef;

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

  deleteExercicio(e: number){
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
