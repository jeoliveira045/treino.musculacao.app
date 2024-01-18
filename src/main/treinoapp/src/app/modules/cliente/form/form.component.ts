import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {ClienteService} from "../../../services/cliente.service";
import {ActivatedRoute} from "@angular/router";
import {Message} from "primeng/api";
import {ExercicioService} from "../../../services/exercicio.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  constructor(protected clienteService: ClienteService, protected activatedRoute: ActivatedRoute, protected exercicioService: ExercicioService){

  }

  treinoGroup: Array<any> = new Array<any>();

  messages: Message[] = []

  clienteId?: number;

  formBuilder: FormBuilder = new FormBuilder()

  formStructure = this.formBuilder.group({
    nome: new FormControl(''),
    treinos: new FormControl([])
  })

  ngOnInit() {
    let id = this.activatedRoute.firstChild?.snapshot.params['id']
    if(id) {
      this.clienteService.findById(id).subscribe((cliente: any) => {
          this.clienteId = id
          this.formStructure.controls['nome'].setValue(cliente.nome)
          this.formStructure.controls['treinos'].setValue(cliente.treinos)
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
