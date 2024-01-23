import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(protected httpClient: HttpClient) { }

  URL_API = "http://localhost:8080/cliente"


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
}
