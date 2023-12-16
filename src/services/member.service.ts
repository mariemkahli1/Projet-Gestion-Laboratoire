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
    //return this.httpClient.get<Member[]>("http://localhost:8100/MEMBRE-SERVICE/membre")
    return new Observable(observer=>observer.next(this.tab))
  }
  tabpub:number[]=[]
  getNbPubByMember():Observable<number[]>{
    for (let i = 0; i < this.tab.length; i++) {
      this.tabpub.push(this.tab[i].tab_pub.length)
    }
    return new Observable(observer=>observer.next(this.tabpub))
  }
  getNbStudByTeacher():Observable<number[]>{
    var tabStudent:number[]=[]
    var count =0
    for (let i = 0; i < this.tab.length; i++) {
      if (this.tab[i].type=="student") {
        count++
      }
    }
    tabStudent.push(count,this.tab.length-count)
    return new Observable(observer=>observer.next(tabStudent))
  }

  constructor(private httpClient:HttpClient) { }
}
