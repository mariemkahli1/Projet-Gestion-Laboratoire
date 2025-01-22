import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  constructor(private AS: ArticleService, private router: Router, private activatedRoute: ActivatedRoute) { }
  form: FormGroup= new FormGroup({
    titre: new FormControl(null, [Validators.required]),
    date: new FormControl<Date | null>(null),
    type: new FormControl(null, [Validators.required]),
    sourcePdf: new FormControl(null, [Validators.required]),
  });
  articleGlobal!: Article;

  ngOnInit(): void {
    const currentId = this.activatedRoute.snapshot.params['id'];
    if (currentId) {
      this.AS.getArticleByid(currentId).subscribe({
        next: (article) => {
          this.articleGlobal = article;
          this.initForm(article);
        },
        error: (err) => console.error('Error fetching article:', err),
      });
    } else {
      this.initForm();
    }
  }

  initForm(article?: Article): void {
    this.form = new FormGroup({
      titre: new FormControl(article?.titre || null, [Validators.required]),
      date: new FormControl(article?.date || null, [Validators.required]),
      type: new FormControl(article?.type || null, [Validators.required]),
      sourcePdf: new FormControl(article?.sourcePdf || null, [Validators.required]),
    });
  }

  onSubmit(): void {
    const currentId = this.activatedRoute.snapshot.params['id'];
    const articleData = { ...this.articleGlobal, ...this.form.value };

    if (currentId) {
      this.AS
        .UpdateArticle(currentId, articleData)
        .subscribe({
          next: () => this.router.navigate(['/articles']),
          error: (err) => console.error('Error updating article:', err),
        });
    } else {
      this.AS
        .SaveArticle(articleData)
        .subscribe({
          next: () => this.router.navigate(['/articles']),
          error: (err) => console.error('Error saving article:', err),
        });
    }
  }
}
