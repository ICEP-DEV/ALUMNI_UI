
import {Observable, pipe, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable,Injector } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  adEvent='http://localhost:3100/api/v1/event/create_event';
  getToken():string {
    return window.localStorage['jwtToken'];
   }
   saveToken(token: string){
    window.localStorage['jwtToken']=token;
  }
  constructor(private http: HttpClient) { }
   handleError(error:any){
    return throwError(error.message || "server error")
  }
  
  destroyToken(){
    window.localStorage.removeItem('jwtToken')
  }
  onUsers(data:any):Observable<any>
  {
    
   
    let head_obj=new HttpHeaders().set("Authorization",`${this.getToken()}`)
                                  .set('Content-Type', 'application/json')
                                  .set('Accept', 'application/json')
    return this.http.post(`${this.adEvent}`,data,{headers:head_obj,responseType: 'text'}).pipe(catchError(this.handleError));
   
    
  }
}
