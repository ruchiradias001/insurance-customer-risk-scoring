import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InsuranceService } from 'src/app/services/insurance.service';

import { Inputs } from 'src/app/types/insurance.type'
import { Branch } from 'src/app/types/insurance.type'
import { Vehicle } from 'src/app/types/insurance.type'
import { Policy } from 'src/app/types/insurance.type'

import branchesData from '../../../assets/data/branches.json';
import vehiclesData from '../../../assets/data/vehicles.json';
import policiesData from '../../../assets/data/policies.json';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['../../styles/styles-pages.scss']
})
export class HeroComponent {
  inputs = {
    inputx : new FormControl(null ,Validators.required),
    input1 : new FormControl(null ,Validators.required),
    input2 : new FormControl(null ,Validators.required),
    input3 : new FormControl(null ,Validators.required),
    input4 : new FormControl(null ,Validators.required),
    input5 : new FormControl(null ,Validators.required),
    input6 : new FormControl(null ,Validators.required),
    input7 : new FormControl(null ,Validators.required),
    input8 : new FormControl(null ,Validators.required),
    input9 : new FormControl(null ,Validators.required),
    input10 : new FormControl(null ,Validators.required),
    input11 : new FormControl(null ,Validators.required),
    input12 : new FormControl(null ,Validators.required),
    input13 : new FormControl(null ,Validators.required),
    input14 : new FormControl(null ,Validators.required),
    input15 : new FormControl(null ,Validators.required),
    input16 : new FormControl(null ,Validators.required),
    input17 : new FormControl(null ,Validators.required),
    input18 : new FormControl(null ,Validators.required),
    input19 : new FormControl(null ,Validators.required),
    input20 : new FormControl(null ,Validators.required),
    input21 : new FormControl(null ,Validators.required),
    input22 : new FormControl(null ,Validators.required),
    input23 : new FormControl(null ,Validators.required)
  }

  inputsForm: FormGroup = new FormGroup(this.inputs);

  error: boolean = false;
  errorMsg: string = 'Invalid Input!!!';

  result !: number;
  private resultSub!: Subscription;

  branches: Branch[] = branchesData;
  vehicles: Vehicle[] = vehiclesData;
  policies: Policy[] = policiesData;

  constructor(private http: HttpClient, private predictionService:  InsuranceService) {}

  ngOnInit(): void {
    this.resultSub = this.predictionService.predictionUpdatedListner()
    .subscribe(updatedResult => {
      this.result = updatedResult;
    })
  }

  checkInputValidation() {
    let valid = true;

    const branchexists = this.branches.some((branch) => 
      branch.branch === this.inputs.input4.value && 
      branch.district === this.inputs.input5.value &&
      branch.province === this.inputs.input6.value &&
      branch.zone === this.inputs.input7.value);
    
    if (!branchexists) {
      this.resetField(this.inputs.input4)
      this.resetField(this.inputs.input5)
      this.resetField(this.inputs.input6)
      this.resetField(this.inputs.input7)
      valid = false;
    }

    const vehicleexists = this.vehicles.some((vehicle) => 
      vehicle.type === this.inputs.input9.value && 
      vehicle.make === this.inputs.input10.value &&
      vehicle.model === this.inputs.input11.value);
    
    if (!vehicleexists) {
      this.resetField(this.inputs.input9)
      this.resetField(this.inputs.input10)
      this.resetField(this.inputs.input11)
      valid = false;
    }

    const policyexists = this.policies.some((policy) => 
      policy.mainclass === this.inputs.input15.value && 
      policy.subclass === this.inputs.input16.value);
    
    if (!policyexists) {
      this.resetField(this.inputs.input15)
      this.resetField(this.inputs.input16)
      valid = false;
    }

    return valid;
  }
  
  checkToProceed() {
    this.inputsForm.markAllAsTouched()
    return this.checkInputValidation()
  }

  resetField(formField: FormControl) {
    formField.reset();
    formField.clearValidators();
    formField.updateValueAndValidity();
  }

  predict() {
    const modelInputs: Inputs = {
      input1: this.inputs.input1.value,
      input2: this.inputs.input2.value,
      input3: this.inputs.input3.value,
      input4: this.inputs.input4.value,
      input5: this.inputs.input5.value,
      input6: this.inputs.input6.value,
      input7: this.inputs.input7.value,
      input8: this.inputs.input8.value,
      input9: this.inputs.input9.value,
      input10: this.inputs.input10.value,
      input11: this.inputs.input11.value,
      input12: this.inputs.input12.value,
      input13: this.inputs.input13.value,
      input14: this.inputs.input14.value,
      input15: this.inputs.input15.value,
      input16: this.inputs.input16.value,
      input17: this.inputs.input17.value,
      input18: this.inputs.input18.value,
      input19: this.inputs.input19.value,
      input20: this.inputs.input20.value,
      input21: this.inputs.input21.value,
      input22: this.inputs.input22.value,
      input23: this.inputs.input23.value    
    }
    if (this.checkToProceed()){
      this.error = false;
      this.predictionService.makePrediction(modelInputs);
    }
    else {
      this.error = true;
    }
  }

}
