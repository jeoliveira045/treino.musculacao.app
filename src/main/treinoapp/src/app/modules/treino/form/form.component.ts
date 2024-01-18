import {Component, OnInit} from '@angular/core';
import {TreinoService} from "../../../services/treino.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ExercicioService} from "../../../services/exercicio.service";
import {MessageService} from "primeng/api";
import {ClienteService} from "../../../services/cliente.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  exerciciosList = new Array<any>();

  clienteList = new Array<any>();

  treinoId: number

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
