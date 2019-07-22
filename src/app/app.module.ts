import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidateFormPageComponent } from './components/candidate-form-page/candidate-form-page.component';
import { CandidatDetailComponent } from './components/candidat-detail/candidat-detail.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { CandidateItemComponent } from './components/candidate-item/candidate-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidatesListComponent,
    CandidateFormPageComponent,
    CandidatDetailComponent,
    PageNotfoundComponent,
    CandidateItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
