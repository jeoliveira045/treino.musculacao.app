import {Component, OnInit} from '@angular/core';
import {ExercicioService} from "../../../services/exercicio.service";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  exerciciosList: Array<any> = new Array<any>();

  constructor(protected exercicioService: ExercicioService){

  }
  ngOnInit(){
    this.getAllExercicios();
  }

  getAllExercicios(){
    return this.exercicioService.findAll().subscribe(results => {
      this.exerciciosList = results
    })
  }

  deleteExercicio(e:number){
    this.exercicioService.delete(e).subscribe(res => res)
    window.location.reload()
  }

}
