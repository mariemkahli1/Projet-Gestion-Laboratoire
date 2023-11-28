import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  tab:Member[]=GLOBAL._DB.membres;

  SaveMember(member:Member):Observable<void>{
    //return this.httpClient.post<void>('linktoRestAPI',member) ;
    //this.tab.push(member);
    this.tab=[member , ...this.tab.filter(item => item.id !=member.id)]
    return new Observable(observer=>{observer.next()})
  }
  getMemberByid(id:string):Observable<Member>{
    //return this.httpClient.get<Member>("linktoRestAPI")
    
    return new Observable(observer=>observer.next(this.tab.find(item=> item.id == id)))
  }
  deleteMemberByid(id:string):Observable<void>{
    //return this.httpClient.delete<void>('linktoRestAPI')
    this.tab=[...this.tab.filter(item => item.id !==id)]

    return new Observable(observer=>{observer.next()})
  }
  getMembers():Observable<Member[]>{
    //return this.httpClient.get<Member[]>("linktoRestAPI")
    return new Observable(observer=>observer.next(this.tab))
  }
  

  constructor(private httpClient:HttpClient) { }
}
