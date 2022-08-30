import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ConsoleComponent } from './pages/console/console.component';
import { LoginComponent } from './pages/login/login.component';
import { DatabasesComponent } from './components/databases/databases.component';
import { ManageDatabasesComponent } from './components/manage-databases/manage-databases.component';
import { ManageSubscriptionComponent } from './components/manage-subscription/manage-subscription.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "console",
    component: ConsoleComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "console/my-db",
    component: DatabasesComponent,
    pathMatch: "full"
  },
  {
    path: "console/manage-db",
    component: ManageDatabasesComponent,
    pathMatch: "full"
  },
  {
    path: "console/manage-subscription",
    component: ManageSubscriptionComponent,
    pathMatch: "full"
  }
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
