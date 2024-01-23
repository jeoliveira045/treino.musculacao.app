import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExercicioService} from "../../../services/exercicio.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-exercicio-form',
  standalone: true,
  imports: [
    DropdownModule,
    ButtonModule,
    MessagesModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    InputTextModule,
  ],
  templateUrl: './exercicio-form.component.html',
  styleUrl: './exercicio-form.component.scss'
})
export class ExercicioFormComponent {
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
