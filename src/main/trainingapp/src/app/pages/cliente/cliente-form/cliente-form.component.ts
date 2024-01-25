import {Component, Directive, Inject, Injectable, Input} from '@angular/core';
import {ClienteService} from "../../../services/cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ExercicioService} from "../../../services/exercicio.service";
import {Message} from "primeng/api";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  ReactiveFormsModule,
  ValidationErrors, Validator,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";

@Directive({
  selector: '[cpfPatternValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CPFValidatorDirective,
      multi: true
    }
  ],
  standalone: true
})
export class CPFValidatorDirective implements Validator{

  constructor(protected cpfValidator: CPFValidatorClass) {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.cpfValidator.CPFValidator()(control)
  }


}
@Injectable()
export class CPFValidatorClass {
  CPFValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      return this.cpfLastTwoNumbersValidation(control.value) ?
             {cpf: {value: control.value}} : null
    }
  }

  cpfLastTwoNumbersValidation(cpf: string): boolean{
    cpf = cpf.replace(/[\.\-]/g, '')
    let digitOne = 0
    let digitTwo = 0
    let digits: any[] = []
    let somaPonderadaFator = 1
    for(let number = cpf.length - 2 ; number >= 0; number--){
      ++somaPonderadaFator
      let d1 = 0
      if(number-1 >= 0) {
        d1 = parseInt(cpf[number-1]) * somaPonderadaFator
        digitOne += d1
      }
      let d2 = parseInt(cpf[number]) * somaPonderadaFator
      digitTwo += d2
    }
    digitOne = 11 - (digitOne % 11)
    digitTwo = (digitTwo % 11)
    digits.push(digitOne)
    digits.push(digitTwo)
    return (cpf[cpf.length - 2] != digits[0] || cpf[cpf.length -1] != digits[1])
  }
}



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
    CPFValidatorDirective
  ],
  providers:[
    CPFValidatorClass
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent {
  constructor(protected cpfValidator: CPFValidatorClass, protected clienteService: ClienteService, protected activatedRoute: ActivatedRoute, protected exercicioService: ExercicioService){

  }

  validationMessage!: string | null

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
      Validators.minLength(11),
      this.cpfValidator.CPFValidator

    ])
  })

  ngOnInit() {
    let id = this.activatedRoute.firstChild?.snapshot.params['id']
    if(id) {
      this.clienteService.findById(id).subscribe((cliente: any) => {
          this.clienteId = id
          this.formStructure.controls['nome'].setValue(cliente.nome)
          this.formStructure.controls['cpf'].setValue(cliente.cpf)
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
    this.clienteId ?
      this.clienteService.update(e.value, this.clienteId).subscribe(
        () => {
          this.messages = [{severity: 'success', summary: "Success", detail: "O cliente foi atualizado!"}]
        }, () => {
          this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
        }
      )
      :
      this.clienteService.insert(e.value).subscribe(
        () => {
          this.messages = [{severity: 'success', summary: "Success", detail: "O cliente foi criado!"}]
        }, () => {
          this.messages = [{severity: 'error', summary: "Error", detail: "Um erro foi identificado"}]
        }
      )
  }

}





