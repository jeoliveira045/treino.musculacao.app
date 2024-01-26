import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExercicioService} from "../../../services/exercicio.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";

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
    NgIf,
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
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ]),
    musculo: new FormControl('', [
      Validators.required
    ])
  })

  get formCtrls(){
    return this.formStructure.controls
  }

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

  insertOrUpdateMessage =  {
    next: (res: any) => {
      console.log(res)
      this.messages = [{severity: 'success', summary: "Success", detail: "O exercicio foi atualizado!"}]
    }, error: (err: any) => {
      this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
    }}

  ngSubmit(e: any){
      this.exercicioService.update(e.value, <number>this.exercicioId).subscribe(this.insertOrUpdateMessage);
  }
}
