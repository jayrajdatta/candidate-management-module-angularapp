import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { CandidateProfileService } from '../../services/candidate-profile.service';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-candidate-item',
  templateUrl: './candidate-item.component.html',
  styleUrls: ['./candidate-item.component.css']
})
export class CandidateItemComponent implements OnInit {
  @Input() candidateProfile: Candidate;

  constructor(private _router: Router
    , private _candidateProfileService: CandidateProfileService) { }

  ngOnInit() {
  }

  viewCandidate() {
    console.log('viewEmployee');
    this._router.navigate(['/candidates', this.candidateProfile.CandidateId]);
  }
  editCandidate() {
    console.log('editEmployee');
    this._router.navigate(['/edit', this.candidateProfile.CandidateId]);
  }
  deleteCandidate() {
    console.log('deleteEmployee');
    this._candidateProfileService.deleteCandidate(this.candidateProfile.CandidateId);
    this._router.navigate(['/candidates']);
  }

}
