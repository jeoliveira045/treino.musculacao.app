import { Component } from '@angular/core';
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {TreinoService} from "../../../services/treino.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ExercicioService} from "../../../services/exercicio.service";
import {ClienteService} from "../../../services/cliente.service";
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-treino-form',
  standalone: true,
  imports: [
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    MessagesModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    NgIf
  ],
  providers:[MessageService],
  templateUrl: './treino-form.component.html',
  styleUrl: './treino-form.component.scss'
})
export class TreinoFormComponent {
  exerciciosList = new Array<any>();

  clienteList = new Array<any>();

  treinoId!: number

  constructor(protected treinoService: TreinoService,
              protected activatedRoute: ActivatedRoute,
              protected exercicioService: ExercicioService,
              protected alunoService: ClienteService,
              protected messageService: MessageService
  ){

  }

  tipoLabel: string = 'tipo'

  ngOnInit() {
    this.treinoId = this.activatedRoute.firstChild?.snapshot.params['id']
    if (this.treinoId) {
      this.treinoService.findById(this.treinoId).subscribe((res: any) => {
        this.treinoFormGroup.controls['tipo'].setValue(res.tipo)
        this.treinoFormGroup.controls['exercicios'].setValue(res.exercicios)
        this.treinoFormGroup.controls['cliente'].setValue(res.cliente)
      })
    }

    this.exercicioService.findAll().subscribe((res: Array<any>) => res.forEach(value => this.exerciciosList.push(value)))
    this.alunoService.findAll().subscribe((res: Array<any>) => res.forEach(value => this.clienteList.push(value)))
  }
  formBuilder: FormBuilder = new FormBuilder()

  treinoFormGroup = this.formBuilder.group({
    tipo: new FormControl('', [Validators.required]),
    exercicios: new FormControl([], [Validators.required]),
    cliente: new FormControl(null, [Validators.required])
  })

  get formCtrls(){
    return this.treinoFormGroup.controls
  }

  insertOrUpdateMessage = {
    next: (res: any) => {
      this.messageService.add({severity: 'success', summary: "Success", detail: "O exercicio foi atualizado!"})
    }, error: (err: any) => {
      this.messageService.add({severity: 'error', summary: "Error", detail: "Um erro foi identificado"})
    }}


  ngSubmit(e: any){
    this.treinoService.update(e.value, <number>this.treinoId).subscribe(this.insertOrUpdateMessage)

  }
}
