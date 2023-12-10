import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Tool } from 'src/models/tool';
@Injectable({
  providedIn: 'root'
})
export class ToolService {
  constructor(private httpClient:HttpClient) { }
  tab:Tool[]=GLOBAL._DB.tools;

  SaveTool(tool:Tool):Observable<void>{
    //return this.httpClient.post<void>('linktoRestAPI',tool) ;
    //this.tab.push(tool);
    this.tab=[tool , ...this.tab.filter(item => item.id !=tool.id)]
    return new Observable(observer=>{observer.next()})
  }
  getToolByid(id:string):Observable<Tool>{
    //return this.httpClient.get<Tool>("linktoRestAPI")
    
    return new Observable(observer=>observer.next(this.tab.find(item=> item.id == id)))
  }
  deleteToolByid(id:string):Observable<void>{
    //return this.httpClient.delete<void>('linktoRestAPI')
    this.tab=[...this.tab.filter(item => item.id !==id)]

    return new Observable(observer=>{observer.next()})
  }
  getTools():Observable<Tool[]>{
    //return this.httpClient.get<Event[]>("linktoRestAPI")
    return new Observable(observer=>observer.next(this.tab))
  }
}
