import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data : any){
  return this.http.post<any>('http://localhost:3000/product/',data)
  }
  getProduct(){
  return this.http.get<any>('http://localhost:3000/product/')
  }
 
 putProduct(data : any, id : number){
  return this.http.put<any>('http://localhost:3000/product/'+id,data)
 }
 
 deleteProduct(id : number){
    return this.http.delete<any>('http://localhost:3000/product/'+id)
  }
}
