import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { Candidate } from '../../models/candidate.model';
import { CandidateProfileService } from '../../services/candidate-profile.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-candidate-form-page',
  templateUrl: './candidate-form-page.component.html',
  styleUrls: ['./candidate-form-page.component.css']
})
export class CandidateFormPageComponent implements OnInit {
  @ViewChild('CandidateForm') public CreateCandidateForm: NgForm;
  candidate: Candidate;
  panelTitle: string;
  private _id: number;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private _candidateProfileService: CandidateProfileService
    , private _router: Router
    , private _route: ActivatedRoute) {
      this.datePickerConfig = Object.assign({},
        {
          containerClass: 'theme-dark-blue',
          showWeekNumbers: false,        
          adaptivePosition: true,
          dateInputFormat: 'YYYY-MM-DD'
        });
     }

  ngOnInit() {
    debugger;
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      //this.getEmployee(this._id);

      this.candidate = {
        CandidateId: 0,
        FullName: null,
        DOB: null,
        Domain: null,
        DocumentName: null
      };

      if (this._id === 0) {
        this.panelTitle = "Add Candidate";
        this.CreateCandidateForm.reset();
      }
      else {
        this.panelTitle = "Edit Candidate";
        Object.assign({}, this._candidateProfileService.getCandidate(this._id)
          .subscribe(candidate => {
            this.candidate = candidate;
          }));
      }
    });

  }

  saveCandidate() {
    console.log(this.candidate); //to check form properties - dirty, valid, value etc
    const newCandidate: Candidate = Object.assign({}, this.candidate);
    this._candidateProfileService.AddEditCandidate(newCandidate).subscribe(res => {
      this.CreateCandidateForm.resetForm(this.candidate);
      this._router.navigate(['candidates']);
    });
  }
}
