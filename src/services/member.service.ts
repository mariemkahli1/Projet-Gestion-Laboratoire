import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Membre_Article } from 'src/models/Membre_Article';
import { Membre_Event } from 'src/models/Membre_Event';
import { Membre_Outil } from 'src/models/Membre_Outil';
import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  students: Member[] = [];
  teachers: Member[] = [];

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>("http://localhost:8100/MEMBRE-SERVICE/membre")
      
  }
  getFullMember(id:string): Observable<Member> {
    return this.httpClient.get<Member>("http://localhost:8100/MEMBRE-SERVICE/fullmember/"+id)
      
  }
  getAllTeachers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>("http://localhost:8100/MEMBRE-SERVICE/enseignant")
    .pipe(
      tap((members: Member[]) => {
        this.teachers=members;
      })
    );
  }
    getAllStudents(): Observable<Member[]> {
    return this.httpClient.get<Member[]>("http://localhost:8100/MEMBRE-SERVICE/etudiant")
    .pipe(
      tap((members: Member[]) => {
        this.students=members;
      })
    );
  }

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
  affecterOutil(memberOutil:Membre_Outil):Observable<void>{
    return this.httpClient.post<void>("http://localhost:8100/MEMBRE-SERVICE/outil" ,memberOutil) ;
  }
  affecterArticle(memberArticle:Membre_Article):Observable<void>{
    return this.httpClient.post<void>("http://localhost:8100/MEMBRE-SERVICE/publication" ,memberArticle) ;
  }
  affecterEvent(memberEvent:Membre_Event):Observable<void>{
    return this.httpClient.post<void>("http://localhost:8100/MEMBRE-SERVICE/evenement" ,memberEvent) ;
  }

  // getMembers():Observable<Member[]>{
  //   return this.httpClient.get<Member[]>("http://localhost:8100/MEMBRE-SERVICE/membre")
  // }
  tabpub:number[]=[]
  // getNbPubByMember():Observable<number[]>{
  //   for (let i = 0; i < this.tab.length; i++) {
  //     this.tabpub.push(this.tab[i].tab_pub.length)
  //   }
  //   return new Observable(observer=>observer.next(this.tabpub))
  // }
  getNbStudByTeacher():Observable<number[]>{
    var tabStudent:number[]=[]
    var count =0
    tabStudent.push(count,this.teachers.length-count)
    tabStudent.push(count,this.students.length-count)
    
    return new Observable(observer=>observer.next(tabStudent))
  }

  constructor(private httpClient:HttpClient) { }
}
