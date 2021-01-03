import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { TasksComponent } from './tasks/tasks.component';
import { ExpensesLoranodesComponent } from './expenses-loranodes/expenses-loranodes.component';
import { ConfigurationPeopleComponent } from './configuration-people/configuration-people.component';
import { ConfigurationPeopleFormComponent } from './configuration-people-form/configuration-people-form.component';
import { ConfigurationCategoriesComponent } from './configuration-categories/configuration-categories.component';
import { ConfigurationCategoryFormComponent } from './configuration-category-form/configuration-category-form.component';
import { ConfigurationCatalogueComponent } from './configuration-catalogue/configuration-catalogue.component'
import { AuthGuard } from './_helpers';
// import { TaskFormComponent } from './tasks/task-form.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const projectsModule = () => import('./projects/projects.module').then(x => x.ProjectsModule);
// const tasksModule = () => import('./tasks/tasks.module').then(x => x.TasksModule);

const routes: Routes = [
  { path: 'account', loadChildren: accountModule },
  { path: 'projects', loadChildren: projectsModule, canActivate: [AuthGuard] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  // { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
  // { path: 'tasks', loadChildren: tasksModule, canActivate: [AuthGuard]},
  { path: 'expenses-loranodes', component: ExpensesLoranodesComponent, canActivate: [AuthGuard]},
  { path: 'configuration-people', component: ConfigurationPeopleComponent, canActivate: [AuthGuard]},
  { path: 'person/:id', component:  ConfigurationPeopleFormComponent, canActivate: [AuthGuard]},
  { path: 'person', component:  ConfigurationPeopleFormComponent, canActivate: [AuthGuard]},
  { path: 'configuration-categories', component: ConfigurationCategoriesComponent, canActivate: [AuthGuard]},
  { path: 'category/:id', component: ConfigurationCategoryFormComponent, canActivate: [AuthGuard]},
  { path: 'category', component: ConfigurationCategoryFormComponent, canActivate: [AuthGuard]},
  { path: 'configuration-catalogue', component: ConfigurationCatalogueComponent, canActivate: [AuthGuard]},
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule), canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard]}

  // otherwise redirect to dahboard
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
