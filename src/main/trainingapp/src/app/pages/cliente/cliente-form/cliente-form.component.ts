import {Component, OnInit} from '@angular/core';
import {ClienteService} from "../../../services/cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ExercicioService} from "../../../services/exercicio.service";
import {Message} from "primeng/api";
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {InputTextModule} from "primeng/inputtext";
import {NgIf, NgStyle} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";
import {CPFValidatorDirective} from "../../../directives/cpfvalidator.directive";
import {CPFValidatorClass} from "../../../custom/validations/cpfvalidation.class";
import {MultiSelectModule} from "primeng/multiselect";
import {Exercicio} from "../../../domain/Exercicio";
import {Cliente} from "../../../domain/Cliente";
import {InputGroupModule} from "primeng/inputgroup";



@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    ButtonModule,
    MessagesModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    NgIf,
    InputNumberModule,
    InputMaskModule,
    CPFValidatorDirective,
    NgStyle,
    MultiSelectModule,
    InputGroupModule
  ],
  providers:[
    CPFValidatorClass
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent implements OnInit{
  constructor(protected clienteService: ClienteService, protected activatedRoute: ActivatedRoute, protected exercicioService: ExercicioService){

  }

  exerciciosList = new Array<any>();

  messages: Message[] = []

  clienteId?: number;

  formBuilder: FormBuilder = new FormBuilder()

  formStructure = this.formBuilder.group({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    altura: new FormControl(0,[
      Validators.required,
    ]),
    idade: new FormControl("", [
      Validators.required
    ]),
    pesoAtual: new FormControl("", [
      Validators.required
    ]),
    pesoDesejado: new FormControl(""),
    exercicios: new FormControl( "" , [Validators.required])
  })

  get formCtrls(){
    return this.formStructure.controls
  }

  ngOnInit() {
    let id = this.activatedRoute.firstChild?.snapshot.params['id']
    if(id) {
      this.clienteService.findById(id).subscribe((cliente: any) => {
          this.clienteId = id
          this.formStructure.controls['nome'].setValue(cliente.nome)
          this.formStructure.controls['altura'].setValue(cliente.altura)
          this.formStructure.controls['idade'].setValue(cliente.idade)
          this.formStructure.controls['pesoAtual'].setValue(cliente.pesoAtual)
          this.formStructure.controls['pesoDesejado'].setValue(cliente.pesoDesejado)
          this.formStructure.controls['exercicios'].setValue(cliente.exercicios)
        }
      )
    }
    this.exercicioService.findAll().subscribe((res: Array<any>) => res.forEach(value => this.exerciciosList.push(value)))
  }

  insertOrUpdateMessage = {
    next: () => {
      this.messages = [{severity: 'success', summary: "Success", detail: `O cliente foi ${this.clienteId? 'atualizado' : 'inserido'}!`}]
    },
    error: () => {
      this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
    }
  }

  ngSubmit(e: any){
      this.clienteService.update(e.value, <number>this.clienteId).subscribe(this.insertOrUpdateMessage)
  }

}





