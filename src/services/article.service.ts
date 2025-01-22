import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Article } from 'src/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl = 'http://localhost:9000/PUBLICATIONSERVICE/publications';
  tab: Article[] = [];

  constructor(private httpClient: HttpClient) {}

  SaveArticle(article: Article): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, article).pipe(
      catchError((error) => {
        console.error('Error saving article:', error);
        return throwError(() => new Error('Error saving article'));
      })
    );
  }

  UpdateArticle(id: string, article: Article): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${id}`, article).pipe(
      catchError((error) => {
        console.error('Error updating article:', error);
        return throwError(() => new Error('Error updating article'));
      })
    );
  }

  getArticleByid(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching article by ID:', error);
        return throwError(() => new Error('Error fetching article by ID'));
      })
    );
  }

  deleteArticleByid(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting article:', error);
        return throwError(() => new Error('Error deleting article'));
      })
    );
  }

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.apiUrl).pipe(
      tap((articles: Article[]) => {
        this.tab = articles;
      }),
      catchError((error) => {
        console.error('Error fetching articles:', error);
        return throwError(() => new Error('Error fetching articles'));
      })
    );
  }
}
