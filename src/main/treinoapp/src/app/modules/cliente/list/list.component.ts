import {Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ClienteService} from "../../../services/cliente.service";
import {MessageService} from "primeng/api";
import {Dialog} from "primeng/dialog";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  clientList: Array<any> = new Array<any>();

  isVisible: boolean = false;

  @ViewChild('message') message: ElementRef;
  @ViewChildren('element') destroyOn: ElementRef;

  constructor(protected clienteService: ClienteService, protected messageService: MessageService) {
  }

  ngOnInit(){
    this.getAllClientes();
  }

  getAllClientes(){
    this.clienteService.findAll().subscribe(res => {
      for(let item of res){
        this.clientList.push(item);
      }
    })
  }

  deleteCliente(e: number){
    this.clienteService.delete(e).subscribe({
      next: ()=>{
        this.clientList = this.clientList.filter((data) => data.id !== e)
        this.messageService.add({severity: 'success', summary: 'Informação: ', detail:'O item foi deletado'});
      },
      error: (err: any) => {
        this.isVisible = true
        this.message.nativeElement.textContent = err.error.trace
      }
    })
  }





}
