import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TreinoService {

  constructor(protected httpClient: HttpClient) { }

  URL_API = "http://localhost:8080/treino"


  public findAll(): Observable<any> {
    return this.httpClient.get(this.URL_API)
  }

  public findById(id: number){
    return this.httpClient.get(`${this.URL_API}/${id}`)
  }

  public insert(resource: any){
    return this.httpClient.post(this.URL_API, resource)
  }

  public update(resource: any, id: number){
    return this.httpClient.put(`${this.URL_API}/${id}`, resource)
  }

  public delete(id: number){
    return this.httpClient.delete(`${this.URL_API}/${id}`)
  }
  getFileSystemNodesData() {
    return [
      {
        "data": {
          "id": '1',
          "tipo": "A"
        },
        "children": [
          {
            "data": {
              "id": "1",
              "descricao": "Rosca Direta 21",
              "musculo": "Biceps"
            },
          }
        ]
      }
    ]
  }
  //           "children":[
  //             {
  //               "data":{
  //                 "name":"angular.app",
  //                 "size":"10mb",
  //                 "type":"Application"
  //               }
  //             },
  //             {
  //               "data":{
  //                 "name":"cli.app",
  //                 "size":"10mb",
  //                 "type":"Application"
  //               }
  //             },
  //             {
  //               "data":{
  //                 "name":"mobile.app",
  //                 "size":"5mb",
  //                 "type":"Application"
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           "data":{
  //             "name":"editor.app",
  //             "size":"25mb",
  //             "type":"Application"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"settings.app",
  //             "size":"50mb",
  //             "type":"Application"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       "data":{
  //         "name":"Cloud",
  //         "size":"20mb",
  //         "type":"Folder"
  //       },
  //       "children":[
  //         {
  //           "data":{
  //             "name":"backup-1.zip",
  //             "size":"10mb",
  //             "type":"Zip"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"backup-2.zip",
  //             "size":"10mb",
  //             "type":"Zip"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       "data": {
  //         "name":"Desktop",
  //         "size":"150kb",
  //         "type":"Folder"
  //       },
  //       "children":[
  //         {
  //           "data":{
  //             "name":"note-meeting.txt",
  //             "size":"50kb",
  //             "type":"Text"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"note-todo.txt",
  //             "size":"100kb",
  //             "type":"Text"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       "data":{
  //         "name":"Documents",
  //         "size":"75kb",
  //         "type":"Folder"
  //       },
  //       "children":[
  //         {
  //           "data":{
  //             "name":"Work",
  //             "size":"55kb",
  //             "type":"Folder"
  //           },
  //           "children":[
  //             {
  //               "data":{
  //                 "name":"Expenses.doc",
  //                 "size":"30kb",
  //                 "type":"Document"
  //               }
  //             },
  //             {
  //               "data":{
  //                 "name":"Resume.doc",
  //                 "size":"25kb",
  //                 "type":"Resume"
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           "data":{
  //             "name":"Home",
  //             "size":"20kb",
  //             "type":"Folder"
  //           },
  //           "children":[
  //             {
  //               "data":{
  //                 "name":"Invoices",
  //                 "size":"20kb",
  //                 "type":"Text"
  //               }
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "data": {
  //         "name":"Downloads",
  //         "size":"25mb",
  //         "type":"Folder"
  //       },
  //       "children":[
  //         {
  //           "data": {
  //             "name":"Spanish",
  //             "size":"10mb",
  //             "type":"Folder"
  //           },
  //           "children":[
  //             {
  //               "data":{
  //                 "name":"tutorial-a1.txt",
  //                 "size":"5mb",
  //                 "type":"Text"
  //               }
  //             },
  //             {
  //               "data":{
  //                 "name":"tutorial-a2.txt",
  //                 "size":"5mb",
  //                 "type":"Text"
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           "data":{
  //             "name":"Travel",
  //             "size":"15mb",
  //             "type":"Text"
  //           },
  //           "children":[
  //             {
  //               "data":{
  //                 "name":"Hotel.pdf",
  //                 "size":"10mb",
  //                 "type":"PDF"
  //               }
  //             },
  //             {
  //               "data":{
  //                 "name":"Flight.pdf",
  //                 "size":"5mb",
  //                 "type":"PDF"
  //               }
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "data": {
  //         "name":"Main",
  //         "size":"50mb",
  //         "type":"Folder"
  //       },
  //       "children":[
  //         {
  //           "data":{
  //             "name":"bin",
  //             "size":"50kb",
  //             "type":"Link"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"etc",
  //             "size":"100kb",
  //             "type":"Link"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"var",
  //             "size":"100kb",
  //             "type":"Link"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       "data":{
  //         "name":"Other",
  //         "size":"5mb",
  //         "type":"Folder"
  //       },
  //       "children":[
  //         {
  //           "data":{
  //             "name":"todo.txt",
  //             "size":"3mb",
  //             "type":"Text"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"logo.png",
  //             "size":"2mb",
  //             "type":"Picture"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       "data":{
  //         "name":"Pictures",
  //         "size":"150kb",
  //         "type":"Folder"
  //       },
  //       "children":[
  //         {
  //           "data":{
  //             "name":"barcelona.jpg",
  //             "size":"90kb",
  //             "type":"Picture"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"primeng.png",
  //             "size":"30kb",
  //             "type":"Picture"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"prime.jpg",
  //             "size":"30kb",
  //             "type":"Picture"
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       "data":{
  //         "name":"Videos",
  //         "size":"1500mb",
  //         "type":"Folder"
  //       },
  //       "children":[
  //         {
  //           "data":{
  //             "name":"primefaces.mkv",
  //             "size":"1000mb",
  //             "type":"Video"
  //           }
  //         },
  //         {
  //           "data":{
  //             "name":"intro.avi",
  //             "size":"500mb",
  //             "type":"Video"
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }

  getFilesystem() {
    console.log(this.getFileSystemNodesData())
    return Promise.resolve(this.getFileSystemNodesData());
  }

}
