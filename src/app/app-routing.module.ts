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

const routes: Routes = [
  
  {
    path:'members',
    pathMatch:'full',
    component: MemberComponent
  },{
    path:'',
    pathMatch:'full',
    component: LoginComponent
  },
  {
    path:'create',
    pathMatch:'full',
    component: MemberFormComponent
  },
  {
    path:'edit/:id',
    pathMatch:'full',
    component: MemberFormComponent
  },
  {
    path:'event/create',
    pathMatch:'full',
    component: EventFormComponent
  },
  {
    path:'event/edit/:id',
    pathMatch:'full',
    component: EventFormComponent
  },
  {
    path:'dashboard',
    pathMatch:'full',
    component: DashboardComponent
  },
  {
    path:'tools',
    pathMatch:'full',
    component: ToolComponent
  },
  {
    path:'articles',
    pathMatch:'full',
    component: ArticleComponent
  },
  {
    path:'events',
    pathMatch:'full',
    component: EventComponent
  },
  
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'members',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
