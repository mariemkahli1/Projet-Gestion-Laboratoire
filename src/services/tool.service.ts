import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Tool } from 'src/models/tool';
@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private readonly apiUrl = 'http://localhost:9000/OUTILSERVICE/outils';
  tab: Tool[] = [];

  constructor(private httpClient: HttpClient) {}

  // Ajouter un nouvel outil
  saveTool(tool: Tool): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, tool);
  }

  // Mettre à jour un outil existant
  updateTool(id: string, tool: Tool): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${id}`, tool);
  }

  // Récupérer un outil par son ID
  getToolById(id: string): Observable<Tool> {
    return this.httpClient.get<Tool>(`${this.apiUrl}/${id}`);
  }

  // Supprimer un outil par son ID
  deleteToolById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer la liste de tous les outils
  getTools(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(this.apiUrl).pipe(
      tap((tools: Tool[]) => {
        this.tab = tools;
      }),
      catchError(error => {
      console.error('Error fetching tools list:', error);
      return throwError(() => new Error('Error fetching tools list'));
      })
    );
  }
}
