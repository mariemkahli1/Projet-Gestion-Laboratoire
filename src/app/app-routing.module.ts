import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './components/member/member.component';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToolComponent } from './components/tool/tool.component';
import { ArticleComponent } from './components/article/article.component';
import { EventComponent } from './components/event/event.component';
import { LoginComponent } from './components/login/login.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EnseignantFormComponent } from './components/enseignant-form/enseignant-form.component';
import { ToolsCreateComponent } from './components/tools-create/tools-create.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { EnseignantComponent } from './components/enseignant/enseignant.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },

  {
    path: 'members',
    canActivate: [authGuard],

    children: [{
      path: '',
      pathMatch: 'full',
      canActivate: [authGuard],

      component: MemberComponent
    },
    {
      path: 'create/student',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: MemberFormComponent
    },
    {
      path: 'create/teacher',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: EnseignantFormComponent
    },
    {
      path: 'edit/:id',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: MemberFormComponent
    },]
  },
  {
    path: 'teacher',
    children: [{
      path: '',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: EnseignantComponent
    },
    {
      path: 'create',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: MemberFormComponent
    },
    {
      path: 'edit/:id',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: MemberFormComponent
    },]
  },
  {
    path: 'student',
    children: [{
      path: '',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: EtudiantComponent
    },
    {
      path: 'create',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: MemberFormComponent
    },
    {
      path: 'edit/:id',
      pathMatch: 'full',
      canActivate: [authGuard],
      component: MemberFormComponent
    },]
  },


  {
    path: 'event/create',
    pathMatch: 'full',
    canActivate: [authGuard],
    component: EventFormComponent
  },
  {
    path: 'event/edit/:id',
    pathMatch: 'full',
    canActivate: [authGuard],
    component: EventFormComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'tools',
    pathMatch: 'full',
    canActivate: [authGuard],
    component: ToolComponent
  },
  {
    path: 'articles',
    pathMatch: 'full',
    canActivate: [authGuard],
    component: ArticleComponent
  },
  {
    path: 'article/create',
    pathMatch: 'full',
    canActivate: [authGuard],
    component: ArticleFormComponent
  },
  {
    path: 'article/edit/:id',
    pathMatch: 'full',
    canActivate: [authGuard],
    component: ArticleFormComponent
  },
  {
    path: 'events',
    pathMatch: 'full',
    canActivate: [authGuard],
    component: EventComponent
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
