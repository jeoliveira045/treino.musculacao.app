import { Component } from '@angular/core';
import {ClienteService} from "../../../services/cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ExercicioService} from "../../../services/exercicio.service";
import {Message} from "primeng/api";
import {FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";


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
    InputMaskModule
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent {
  constructor(protected clienteService: ClienteService, protected activatedRoute: ActivatedRoute, protected exercicioService: ExercicioService){

  }

  validationMessage!: string | null

  log(e: any){
    e.validationMessage ? this.validationMessage = e.validationMessage : this.validationMessage = null
  }

  treinoGroup: Array<any> = new Array<any>();

  messages: Message[] = []

  clienteId?: number;

  formBuilder: FormBuilder = new FormBuilder()

  formStructure = this.formBuilder.group({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(10)

    ])
  })

  ngOnInit() {
    let id = this.activatedRoute.firstChild?.snapshot.params['id']
    if(id) {
      this.clienteService.findById(id).subscribe((cliente: any) => {
          this.clienteId = id
          this.formStructure.controls['nome'].setValue(cliente.nome)
        }
      )
    }
    this.exercicioService.findAll().subscribe((res: any) =>{
      for(let item of res){
        this.treinoGroup.push(item)
      }
    })

  }

  ngSubmit(e: any){
    console.log(e)
    // this.clienteId ?
    //   this.clienteService.update(e.value, this.clienteId).subscribe(
    //     () => {
    //       this.messages = [{severity: 'success', summary: "Success", detail: "O cliente foi atualizado!"}]
    //     }, () => {
    //       this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
    //     }
    //   )
    //   :
    //   this.clienteService.insert(e.value).subscribe(
    //     () => {
    //       this.messages = [{severity: 'success', summary: "Success", detail: "O cliente foi criado!"}]
    //     }, () => {
    //       this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
    //     }
    //   )
  }
  CPFValidator(e: any){
    let cpf = e.value.replace(/[\.\-]/g, '')
    let subtract = 1
    let d1 = this.calculatingCpfLastTwoNumbers(cpf, 3)
    let d2 = this.calculatingCpfLastTwoNumbers(cpf, 2)
    if(cpf[cpf.length-1] == d2 && cpf[cpf.length-2]==d1){
      console.log('cpf valido')
    }
  }

  calculatingCpfLastTwoNumbers(cpf: string, lengthSubtraction: number): number{
    let digit = 0
    let subtract = 1
    for(let number = cpf.length - lengthSubtraction ; number >= 0; number--){
      let numero = parseInt(cpf[number]) * ++subtract
      digit += numero
    }
    lengthSubtraction == 3 ? digit =  11 - (digit % 11) : digit = digit % 11
    return digit

  }
}


