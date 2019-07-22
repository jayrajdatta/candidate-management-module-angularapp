import { Component, OnInit } from '@angular/core';


import { Candidate } from '../../models/candidate.model';
import { CandidateProfileService } from '../../services/candidate-profile.service';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {

  candidates: Candidate[];
  errorMessage: string;
  config: any;
  
  filteredCandidates: Candidate[];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredCandidates = this.getFilteredCandidates(value);

    this.config = {
      id: 'custom',
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.filteredCandidates.length
    };
  }

  getFilteredCandidates(searchString: string) {
    return this.candidates.filter(candidate =>
      candidate.FullName.toLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
  }

  constructor(private _candidateProfileService: CandidateProfileService) { }

  ngOnInit() {
    this._candidateProfileService.getCandidates().subscribe(candidateList => {
      this.candidates = candidateList;
      this.filteredCandidates = this.candidates;

      this.config = {
        id: 'custom',
        itemsPerPage: 5,
        currentPage: 1,
        totalItems: this.filteredCandidates.length
      };
    },
      err => {
        this.errorMessage = err;
        console.log('error msg: ', this.errorMessage);

      },
      () => console.log('Processing is Complete.'));
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

}
