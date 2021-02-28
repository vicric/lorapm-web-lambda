import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';

import { AppMaterialModule } from './app-material/app-material.module';

import { ProjectsComponent } from './projects/projects.component';
import { ConfigurationCategoriesComponent } from './configuration-categories/configuration-categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { TasksComponent } from './tasks/tasks.component';
import { ConfigurationPeopleComponent } from './configuration-people/configuration-people.component';
import { ExpensesLoranodesComponent } from './expenses-loranodes/expenses-loranodes.component';
import { ConfigurationCatalogueComponent } from './configuration-catalogue/configuration-catalogue.component';
import { ConfigurationCategoryFormComponent } from './configuration-category-form/configuration-category-form.component';
import { ConfigurationPeopleFormComponent } from './configuration-people-form/configuration-people-form.component';
import { appInitializer, JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AccountService } from './_services';
import { ProjectService } from './_services';



@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ConfigurationCategoriesComponent,
    DashboardComponent,
    // TasksComponent,
    ConfigurationPeopleComponent,
    ExpensesLoranodesComponent,
    ConfigurationCatalogueComponent,
    ConfigurationCategoryFormComponent,
    ConfigurationPeopleFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
