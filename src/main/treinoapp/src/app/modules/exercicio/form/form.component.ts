import {Component, OnInit} from '@angular/core';
import {ExercicioService} from "../../../services/exercicio.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {Message} from "primeng/api";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  messages: Message[] = [];

  exercicioId?: number

  musculoSelectBoxListItem = ["Biceps","Triceps","Costas", "Peito", "Deltóide", "Trapézio", "Pernas","Cardio"]

  formBuilder: FormBuilder = new FormBuilder()

  formStructure = this.formBuilder.group({
    descricao: new FormControl(''),
    musculo: new FormControl('')
  })

  constructor(protected exercicioService: ExercicioService, protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(){
    let id = this.activatedRoute.firstChild?.snapshot.params['id']
    if(id){
      this.exercicioId = id
      this.exercicioService.findById(id).subscribe((exercicio: any) => {
        this.formStructure.controls['descricao'].setValue(exercicio.descricao)
        this.formStructure.controls['musculo'].setValue(exercicio.musculo)
      })
    }
  }

  ngSubmit(e: any){
    this.exercicioId ?
      this.exercicioService.update(e.value, this.exercicioId).subscribe(
          (res) => {
            this.messages = [{severity: 'success', summary: "Success", detail: "O exercicio foi atualizado!"}]
          }, (err: any) => {
            this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
          }
        )
      :
      this.exercicioService.insert(e.value).subscribe(
          () => {
            this.messages = [{severity: 'success', summary: "Success", detail: "O exercicio foi criado!"}]
          }, (err:any) => {
            this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
          }

      )
  }

}
