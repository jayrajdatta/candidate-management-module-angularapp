export class Candidate {
    CandidateId: number;
    FullName: string;
    DOB?: Date;
    Domain?: string;
    DocumentName?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}