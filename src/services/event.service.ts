import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Event } from 'src/models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  tab:Event[]=[]
  SaveEvent(event:Event):Observable<void>{
    return this.httpClient.post<void>("http://localhost:8100/EVENEMENT-SERVICE" ,event) ;

  }
  UpdateEvent(event:Event):Observable<void>{
    return this.httpClient.put<void>("http://localhost:8100/EVENEMENT-SERVICE/evenement/update" ,event) ;

  }
  getEventByid(id:string):Observable<Event>{
    return this.httpClient.get<Event>("http://localhost:8100/EVENEMENT-SERVICE/evenement/"+id)

  }
  deleteEventByid(id:string):Observable<void>{
    return this.httpClient.delete<void>("http://localhost:8100/EVENEMENT-SERVICE/"+id)

  }
  getEvents():Observable<Event[]>{
    return this.httpClient.get<Event[]>("http://localhost:8100/EVENEMENT-SERVICE/evenement").pipe(
      tap((events: Event[]) => {
        this.tab.push(...events);
      })
    );

  }
  

  constructor(private httpClient:HttpClient) { }
}
