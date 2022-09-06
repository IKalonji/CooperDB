import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
import { ConfirmDeleteDialog, DatabasesComponent, RenameDatabaseDialog } from './components/databases/databases.component';
import { ManageDatabasesComponent } from './components/manage-databases/manage-databases.component';
import { ManageSubscriptionComponent } from './components/manage-subscription/manage-subscription.component';
import { ConsoleViewDirective } from './directives/console-view.directive';
import { ConsoleMainViewSelectorComponent } from './components/console-main-view-selector/console-main-view-selector.component';
import { CreateUpdateTableComponent } from './components/create-update-table/create-update-table.component';



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
    ConfirmDeleteDialog,
    RenameDatabaseDialog,
    CreateUpdateTableComponent
  ],
  imports: [
    AngularMaterialImportsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
