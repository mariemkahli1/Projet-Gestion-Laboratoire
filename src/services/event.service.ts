import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Event } from 'src/models/event';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly apiUrl = 'http://localhost:9000/EVENEMENTSERVICE/evenements';
  tab: Event[] = [];

  constructor(private httpClient: HttpClient) {}

  // Ajouter un événement
  SaveEvent(event: Event): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, event);
  }

  // Mettre à jour un événement
  UpdateEvent(id: string, event: Event): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${id}`, event);
  }

  // Récupérer un événement par son ID
  getEventByid(id: string): Observable<Event> {
    return this.httpClient.get<Event>(`${this.apiUrl}/${id}`);
  }

  // Supprimer un événement par son ID
  deleteEventByid(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer la liste de tous les événements
  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.apiUrl).pipe(
      tap((events: Event[]) => {
        this.tab = events;
      })
    );
  }

  

}
