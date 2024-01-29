import {Component, OnInit} from '@angular/core';
import {ClienteService} from "../../../services/cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ExercicioService} from "../../../services/exercicio.service";
import {Message} from "primeng/api";
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators, ɵElement
} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {InputTextModule} from "primeng/inputtext";
import {NgIf, NgStyle} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";
import {CPFValidatorDirective} from "../../../directives/cpfvalidator.directive";
import {CPFValidatorClass} from "../../../custom/validations/cpfvalidation.class";
import {Cliente} from "../../../domain/Cliente";


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
    NgStyle
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

  messages: Message[] = []

  clienteId?: number;

  formBuilder: FormBuilder = new FormBuilder()

  form = this.formBuilder.record({['cliente']: Cliente})

  formStructure = this.formBuilder.group({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      CPFValidatorClass.CPFValidator
    ])
  })

  get formCtrls(){
    return this.formStructure.controls
  }

  ngOnInit() {
    let id = this.activatedRoute.firstChild?.snapshot.params['id']
    if(id) {
      this.clienteService.findById(id).subscribe((cliente: Cliente) => {
          this.clienteId = cliente.id
          this.formStructure.controls['nome'].setValue(<string|null>cliente.nome)
          this.formStructure.controls['cpf'].setValue(<string|null>cliente.cpf)
        }
      )
    }

  }

  insertOrUpdateMessage = {
    next: () => {
      this.messages = [{severity: 'success', summary: "Success", detail: `O cliente foi ${this.clienteId? 'atualizado' : 'inserido'}!`}]
    }, error: () => {
      this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
    }
  }

  ngSubmit(e: any){
      this.clienteService.update(e.value, <number>this.clienteId).subscribe(this.insertOrUpdateMessage)
  }

}





