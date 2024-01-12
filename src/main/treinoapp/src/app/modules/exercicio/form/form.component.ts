import { Component } from '@angular/core';
import {ExercicioService} from "../../../services/exercicio.service";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  formBuilder: FormBuilder = new FormBuilder()

  formStructure = this.formBuilder.group({
    descricao: new FormControl(''),
    musculo: new FormControl('')
  })

  constructor(protected exercicioService: ExercicioService) {
  }

  ngSubmit(e: any){
    this.exercicioService.insert(e.value).subscribe(res => res);
  }

}
