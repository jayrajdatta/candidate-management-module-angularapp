import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { CandidateFormPageComponent } from './components/candidate-form-page/candidate-form-page.component';
import { CandidatDetailComponent } from './components/candidat-detail/candidat-detail.component';
import { CandidateFormCanDeactivateService } from './services/CandidateFormCanDeactivate.service';

const routes: Routes = [
  { path: '', redirectTo: 'candidates', pathMatch: 'full' },
  {
    path: 'candidates',
    component: CandidatesListComponent
  },
  {
    path: 'candidates/:id',
    component: CandidatDetailComponent
  },
  {
    path: 'edit/:id',
    component: CandidateFormPageComponent,
    canDeactivate: [CandidateFormCanDeactivateService]
  }
  ,
  {
    path: 'notFound',
    component: PageNotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'notFound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
