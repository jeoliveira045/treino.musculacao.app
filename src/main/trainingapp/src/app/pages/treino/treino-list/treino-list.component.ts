//   import {Component, ElementRef, ViewChild} from '@angular/core';
// import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
// import {MessageService, TreeNode} from "primeng/api";
// import {TableModule} from "primeng/table";
// import {ButtonModule} from "primeng/button";
// import {MessagesModule} from "primeng/messages";
// import {DialogModule} from "primeng/dialog";
// import {TreinoService} from "../../../services/treino.service";
// import {RouterLink} from "@angular/router";
//
// @Component({
//   selector: 'app-treino-list',
//   standalone: true,
//   imports: [
//     TableModule,
//     ButtonModule,
//     MessagesModule,
//     DialogModule,
//     RouterLink
//   ],
//   providers: [
//     DialogService,
//     TreinoService,
//     MessageService
//   ],
//   templateUrl: './treino-list.component.html',
//   styleUrl: './treino-list.component.scss'
// })
// export class TreinoListComponent {
//   treinosList: Array<TreeNode> = new Array<TreeNode>()
//
//   ref!: DynamicDialogRef
//
//   fields = ['Descrição', 'Músculo']
//
//   isVisible: boolean = false;
//
//   @ViewChild('message') message!: ElementRef;
//
//   constructor(protected dialogService: DialogService,  protected treinoService: TreinoService, protected messageService: MessageService) {
//   }
//
//
//   ngOnInit(){
//     this.getAllTreinos()
//   }
//
//   ngOnDestroy(){
//     if(this.ref){
//       this.ref.close()
//     }
//   }
//
//   getAllTreinos() {
//     this.treinoService.findAll().subscribe((res: any) => {
//         for (let item of res) {
//           this.treinosList.push(item)
//         }
//       }
//     )
//   }
//
//   deleteTreino(e: number){
//     this.treinoService.delete(e).subscribe({
//       next: ()=>{
//         this.treinosList = this.treinosList.filter((data: any) => data.id !== e)
//         this.messageService.add({severity: 'success', summary: 'Informação: ', detail:'O item foi deletado'});
//       },
//       error: (err: any) => {
//         this.isVisible = true
//         this.message.nativeElement.textContent = err.error.trace
//       }
//     })
//   }
//
// }
