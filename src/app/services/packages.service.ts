import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  packages: any
  package:any
  baseUrl!:string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
   }


  getPackages():Observable<any>{

    this.packages = this.http.get<any>(`${this.baseUrl}/pacs`).pipe(
      catchError((err:any, caught: Observable<any>) => {
        console.log(err);
        return caught;
      })

      )
      return this.packages;
     
    }

    getPackage():Observable<any>{
      this.package = this.http.get<any>(`${this.baseUrl}/pacs/${environment.idAux}`).pipe(
        catchError((err:any, caught: Observable<any>) => {
          console.log(err);
          return caught;
        })
      )
      return this.package
    }

  addPackage(pack:any):Observable<any>{

    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }

    this.packages = this.http.put<any>(`${this.baseUrl}/pacs`,pack,{headers}).pipe(
      catchError( (err:any, caught: Observable<any>) => {
        console.log(err)
        return caught;
      })
    )
    return this.packages

  }

  putPackage(pack:any, id:number):Observable<any>{

    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    
    this.packages = this.http.put<any>(`${this.baseUrl}/pacs/${id}`, pack, {headers}).pipe(

      catchError( (err:any, caught: Observable<any>) => {
        console.log(err);
        return caught;
      })
    )
    return this.packages;

  }

  }


