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

  constructor(private _candidateProfileService: CandidateProfileService) { }

  ngOnInit() {
    this._candidateProfileService.getCandidates().subscribe(candidateList => {
      this.candidates = candidateList;
    },
      err => {
        this.errorMessage = err;
        console.log('error msg: ', this.errorMessage);

      },
      () => console.log('Processing is Complete.'));
  }

}
