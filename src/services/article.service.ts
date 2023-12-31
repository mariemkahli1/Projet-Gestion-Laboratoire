import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Article } from 'src/models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private httpClient:HttpClient) { }
  tab:Article[]=[];

  SaveArticle(tool:Article):Observable<void>{
    return this.httpClient.post<void>("http://localhost:8100/PUBLICATION-SERVICE" ,tool) ;
  }
  UpdateArticle(tool:Article):Observable<void>{
    return this.httpClient.put<void>("http://localhost:8100/PUBLICATION-SERVICE/publication/update" ,tool) ;
  }
  getArticleByid(id:string):Observable<Article>{
    return this.httpClient.get<Article>("http://localhost:8100/PUBLICATION-SERVICE/publication/"+id)
  }
  deleteArticleByid(id:string):Observable<void>{
    return this.httpClient.delete<void>("http://localhost:8100/PUBLICATION-SERVICE/"+id)
  }
  getArticles():Observable<Article[]>{
    return this.httpClient.get<Article[]>("http://localhost:8100/PUBLICATION-SERVICE/publication").pipe(
      tap((articles: Article[]) => {
        this.tab=articles;
      })
    );
  }
}
