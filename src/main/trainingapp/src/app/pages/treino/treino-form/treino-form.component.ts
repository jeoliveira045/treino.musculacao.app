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
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

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
    RouterLink
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
    tipo: new FormControl(''),
    exercicios: new FormControl([]),
    cliente: new FormControl(null)
  })

  ngSubmit(e: any){
    if(this.treinoId){
      this.treinoService.update(e.value, this.treinoId).subscribe(res => res)
      this.messageService.add({severity: 'success',summary:'Informação: ', detail: 'os dados do formulário foram atualizados', life: 5000})
    }else{
      this.treinoService.insert(e.value).subscribe(res => res)
      this.messageService.add({severity: 'success',summary:'Informação: ', detail: 'os dados do formulário foram salvos', life: 5000})
    }


  }
}
