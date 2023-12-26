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

  SaveEtudiant(etudiant:Member):Observable<void>{
    return this.httpClient.post<void>("http://localhost:8100/MEMBRE-SERVICE/etudiant" ,etudiant) ;
  }
  SaveEnseignant(enseignant:Member):Observable<void>{
    return this.httpClient.post<void>("http://localhost:8100/MEMBRE-SERVICE/enseignant" ,enseignant) ;
  }
  getMemberByid(id:string):Observable<Member>{
    return this.httpClient.get<Member>("http://localhost:8100/MEMBRE-SERVICE/membre/"+id)
  }
  deleteMemberByid(id:string):Observable<void>{
    return this.httpClient.delete<void>("http://localhost:8100/MEMBRE-SERVICE/"+id)
  }
  getMembers():Observable<Member[]>{
    return this.httpClient.get<Member[]>("http://localhost:8100/MEMBRE-SERVICE/membre")
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
