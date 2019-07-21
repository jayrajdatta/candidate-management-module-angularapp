import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

import { Candidate } from '../models/candidate.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateProfileService {

  candidateList: Candidate[];
  candidate: Candidate;

  constructor(private _httpClient: HttpClient) { }

  getCandidates(): Observable<Candidate[]> {

    this.candidateList = new Array<Candidate>();

    return this._httpClient
      .get(environment.API_URL + 'api/candidates').pipe(
        retry(3),
        map((response: Candidate[]) => {
          response.forEach(candidate => {
            this.candidateList.push(candidate);
          });

          return this.candidateList;
        }),
        catchError(
          (e: any) => Observable.throw(this.errorHandler(e))
        )
      );
  }

  getCandidate(id: number): Observable<Candidate> {
    this.candidate = new Candidate();

    return this._httpClient
      .get(environment.API_URL + 'api/candidates/getcandidate?id=' + id).pipe(
        retry(3),
        map((response: Candidate[]) => {
          response.forEach(candidate => {
            this.candidate = candidate;
          });

          return this.candidate;
        }),
        catchError(
          (e: any) => Observable.throw(this.errorHandler(e))
        )
      );
  }

  public AddEditCandidate(candidate: Candidate): Observable<any> {
    debugger;
    const subject = new Subject<any>();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    //const options = new RequestOptions({ headers: headers });
    const options = { headers: headers };

    this._httpClient
      .post(environment.API_URL + 'api/candidates/addcandidate',
        JSON.stringify(candidate), options)
      .subscribe(
        res => {
          console.log(res);
          subject.next(res);
          subject.complete();
        },
        err => {
          console.log(err);
          subject.next(err);
          subject.complete();
        });
    return subject.asObservable();
  }

  public deleteCandidate(id: number) {
    return this._httpClient
      .delete(environment.API_URL + '/api/candidates?id=' + id)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        });
  }


  //error handling method
  errorHandler(error: any): string {
    //test comment
    console.log(error);
    return "api is down";
  }
}
