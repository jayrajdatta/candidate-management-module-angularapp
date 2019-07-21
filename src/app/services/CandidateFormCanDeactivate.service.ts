import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { CandidateFormPageComponent } from '../components/candidate-form-page/candidate-form-page.component';

@Injectable({
    providedIn: 'root'
})

export class CandidateFormCanDeactivateService implements CanDeactivate<CandidateFormPageComponent>{
    constructor() { }
    canDeactivate(component: CandidateFormPageComponent): boolean {
        if (component.CreateCandidateForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }

}