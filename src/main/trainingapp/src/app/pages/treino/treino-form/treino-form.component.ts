import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {ExercicioService} from "../../../services/exercicio.service";
import {ActivatedRoute} from "@angular/router";
import {TreinoService} from "../../../services/treino.service";
import {InputGroupModule} from "primeng/inputgroup";
import {ChipsModule} from "primeng/chips";
import {InputTextModule} from "primeng/inputtext";
import { MultiSelectModule } from 'primeng/multiselect';
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-treino-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputGroupModule, InputTextModule, MultiSelectModule, ButtonModule],
  templateUrl: './treino-form.component.html',
  styleUrls: ['./treino-form.component.scss']
})
export class TreinoFormComponent implements OnInit {

  constructor(protected treinoService: TreinoService, protected activatedRoute: ActivatedRoute, protected exercicioService: ExercicioService) {
  }

  treinoId?: number

  formBuilder = new FormBuilder();

  formStructure = this.formBuilder.group({
    nomeDoTreino: new FormControl(''),
    exercicio: new FormControl([])
  })

  exercicioList: Array<any> = new Array<any>()

  ngOnInit(){
    let id = this.activatedRoute.firstChild?.snapshot.params['id']
    if(id){
      this.treinoId = id
      this.treinoService.findById(id).subscribe((res: any) => {
        this.formStructure.controls['nomeDoTreino'].setValue(res.nomeDoTreino)
        this.formStructure.controls['exercicio'].setValue(res.exercicio)
      })
    }

    this.exercicioService.findAll().subscribe(res => {
      this.exercicioList = res
    })


  }

  ngSubmit(e: any){
    console.log(e)
    this.treinoService.update(e.value, <number>this.treinoId).subscribe(res => res)

  }

}
