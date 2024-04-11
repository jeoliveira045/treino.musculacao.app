import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {TreinoService} from "../../../services/treino.service";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-treino-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, TableModule],
  templateUrl: './treino-list.component.html',
  styleUrls: ['./treino-list.component.scss']
})
export class TreinoListComponent implements OnInit {

  constructor(protected treinoService: TreinoService) {
  }

  treinoList: Array<any> = new Array<any>()

  ngOnInit(){
    this.treinoService.findAll().subscribe(res => {
      this.treinoList = res
    })
  }

}
