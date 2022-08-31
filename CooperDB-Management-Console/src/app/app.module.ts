import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ConsoleComponent } from './pages/console/console.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { HowItWorksBannerComponent } from './components/how-it-works-banner/how-it-works-banner.component';
import { SponsorCardComponent } from './components/sponsor-card/sponsor-card.component';
import { AngularMaterialImportsModule } from './angular-material-imports.module';
import { DatabasesComponent } from './components/databases/databases.component';
import { ManageDatabasesComponent } from './components/manage-databases/manage-databases.component';
import { ManageSubscriptionComponent } from './components/manage-subscription/manage-subscription.component';
import { ConsoleViewDirective } from './directives/console-view.directive';
import { ConsoleMainViewSelectorComponent } from './components/console-main-view-selector/console-main-view-selector.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ConsoleComponent,
    HomeBannerComponent,
    HowItWorksBannerComponent,
    SponsorCardComponent,
    DatabasesComponent,
    ManageDatabasesComponent,
    ManageSubscriptionComponent,
    ConsoleViewDirective,
    ConsoleMainViewSelectorComponent,
  ],
  imports: [
    AngularMaterialImportsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
