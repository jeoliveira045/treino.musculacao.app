import {Component, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {MessagesModule} from "primeng/messages";
import {DialogModule} from "primeng/dialog";
import {ClienteService} from "../../../services/cliente.service";
import {MessageService} from "primeng/api";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    MessagesModule,
    DialogModule,
    RouterLink,
  ],
  providers:[MessageService],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent {
  clientList: Array<any> = new Array<any>();

  isVisible: boolean = false;

  @ViewChild('message') message!: ElementRef;
  @ViewChildren('element') destroyOn!: ElementRef;

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