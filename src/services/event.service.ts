import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Event } from 'src/models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  tab:Event[]=GLOBAL._DB.events;

  SaveEvent(event:Event):Observable<void>{
    //return this.httpClient.post<void>('linktoRestAPI',event) ;
    //this.tab.push(event);
    this.tab=[event , ...this.tab.filter(item => item.id !=event.id)]
    return new Observable(observer=>{observer.next()})
  }
  getEventByid(id:string):Observable<Event>{
    //return this.httpClient.get<Event>("linktoRestAPI")
    
    return new Observable(observer=>observer.next(this.tab.find(item=> item.id == id)))
  }
  deleteEventByid(id:string):Observable<void>{
    //return this.httpClient.delete<void>('linktoRestAPI')
    this.tab=[...this.tab.filter(item => item.id !==id)]

    return new Observable(observer=>{observer.next()})
  }
  getEvents():Observable<Event[]>{
    //return this.httpClient.get<Event[]>("linktoRestAPI")
    return new Observable(observer=>observer.next(this.tab))
  }
  

  constructor(private httpClient:HttpClient) { }
}
