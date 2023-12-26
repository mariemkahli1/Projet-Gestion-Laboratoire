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

const routes: Routes = [
  
  {
    path:'members',
    //pathMatch:'full',
    //component: MemberComponent,
    children:[{
      path:'',
      pathMatch:'full',
      component: MemberComponent
    },
    {
      path:'create/student',
      pathMatch:'full',
      component: MemberFormComponent
    },
    {
      path:'create/teacher',
      pathMatch:'full',
      component: EnseignantFormComponent
    },
    {
      path:'edit/:id',
      pathMatch:'full',
      component: MemberFormComponent
    },]
  },
  {
    path:'',
    pathMatch:'full',
    component: LoginComponent
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
    path:'tools/edit/:id',
    pathMatch:'full',
    component: ToolsCreateComponent
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
