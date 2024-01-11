import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {

  URL_API = "http://localhost:4200/cliente"

  constructor(protected httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.URL_API)
  }

  public findById(id: number){
    return this.httpClient.get(`${this.URL_API}/${id}`)
  }

  public insert(resource){
    return this.httpClient.post(this.URL_API, resource)
  }

  public update(resource, id: number){
    return this.httpClient.put(`${this.URL_API}/${id}`, resource)
  }

  public delete(id){
    return this.httpClient.delete(`${this.URL_API}/${id}`)
  }

  public findByMusculo(musculo: string){
    return this.httpClient.get(`${this.URL_API}/tipo/${musculo}`)
  }
}
