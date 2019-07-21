import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CandidateProfileService } from '../../services/candidate-profile.service';
import { Candidate } from '../../models/candidate.model';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.css']
})
export class CandidatDetailComponent implements OnInit {
  candidate: Candidate;
  private _id: number;

  constructor(private _route: ActivatedRoute
    , private _router: Router
    , private _candidateProfileService: CandidateProfileService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this._candidateProfileService.getCandidate(this._id).subscribe(candidate => { this.candidate = candidate });
    });
  }

  downloadFile() {
    console.log(this._id);
    this._candidateProfileService.downloadFile(this._id)
      .subscribe((fileData: BlobPart) => {
        debugger;
        let b: any = new Blob([fileData], { type: 'application/octet-stream' });
        var url = window.URL.createObjectURL(b);
        window.open(url);
      });
  }


}
