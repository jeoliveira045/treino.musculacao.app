import {Component, OnInit} from '@angular/core';
import {ClienteService} from "../../../services/cliente.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  clientList: Array<any> = new Array<any>()

  constructor(protected clienteService: ClienteService) {
  }

  ngOnInit(){
    this.getAllClientes()
  }

  getAllClientes(){
    this.clienteService.findAll().subscribe(res => {
      for(let item of res){
        this.clientList.push(item);
      }
    })
  }

  deleteCliente(e: number){
    this.clienteService.delete(e).subscribe(res => res)
    window.location.reload()
  }





}
