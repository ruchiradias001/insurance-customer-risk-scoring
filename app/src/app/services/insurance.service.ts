import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// TYPES
import { Inputs } from "../types/insurance.type";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class InsuranceService {
    constructor(private http: HttpClient) { }

    private prediction !: number;
    private predictionUpdated = new Subject<number>();

    makePrediction(inputs: Inputs) {
        this.http.post('http://192.168.56.1:5000/prediction', { inputs: inputs })
        .subscribe((response: any) => {
            this.prediction = response['result'];
            this.predictionUpdated.next(this.prediction);
          });
    }
    predictionUpdatedListner() {
        return this.predictionUpdated.asObservable();
    }
}