

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { countryList, stateList } from 'src/app/shared/models/master';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  validationForm!: FormGroup;
  countryInputVal: number | null = null;
  permCountryInputVal: number |null=null;
  constructor(private employeeService: EmployeeServiceService, private toastr: ToastrService) {
    this.validationForm = new FormGroup({
      PresentAddress: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)], updateOn: 'change' }),
      PresentAddress2: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)], updateOn: 'change' }),
      PresentCity: new FormControl(null, { validators: [Validators.required, Validators.maxLength(30), Validators.pattern("^[a-zA-Z ]*$")], updateOn: 'change' }),
      //PresentPostalcode: new FormControl(null, { validators: [Validators.required, Validators.maxLength(6)], updateOn: 'change' }),
      PresentPostalcode: new FormControl(null, { validators: [Validators.required, Validators.pattern("^([1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3})$")], updateOn:'change'}),
      PresentCountry: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      PresentState: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      PermanentAddress: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)], updateOn: 'change' }),
      PermanentAddress2: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)], updateOn: 'change' }),
      PermanentCity: new FormControl(null, { validators: [Validators.required, Validators.maxLength(30), Validators.pattern("^[a-zA-Z ]*$")], updateOn: 'change' }),
      //PermanentPostalcode: new FormControl(null, { validators: [Validators.required, Validators.maxLength(6)], updateOn: 'change' }),
      PermanentPostalcode: new FormControl(null, { validators: [Validators.required, Validators.pattern("^([1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3})$")], updateOn:'change'}),
      PermanentCountry: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      PermanentState: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });
  }

  ngOnInit(): void {
    this.getpresentCountryList();
    this.getPermanentCountryList();
  }

  get PresentAddress(): AbstractControl {
    return this.validationForm.get('PresentAddress')!;
  }
  get PresentAddress2(): AbstractControl {
    return this.validationForm.get('PresentAddress2')!;
  }
  get PresentCity(): AbstractControl {
    return this.validationForm.get('PresentCity')!;
  }
  get PresentPostalcode(): AbstractControl {
    return this.validationForm.get('PresentPostalcode')!;
  }
  get PresentCountry(): AbstractControl {
    return this.validationForm.get('PresentCountry')!;
  }
  get PresentState(): AbstractControl {
    return this.validationForm.get('PresentState')!;
  }
  get PermanentAddress(): AbstractControl {
    return this.validationForm.get('PermanentAddress')!;
  }
  get PermanentAddress2(): AbstractControl {
    return this.validationForm.get('PermanentAddress2')!;
  }
  get PermanentCity(): AbstractControl {
    return this.validationForm.get('PermanentCity')!;
  }
  get PermanentPostalcode(): AbstractControl {
    return this.validationForm.get('PermanentPostalcode')!;
  }
  get PermanentCountry(): AbstractControl {
    return this.validationForm.get('PermanentCountry')!;
  }
  get PermanentState(): AbstractControl {
    return this.validationForm.get('PermanentState')!;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();

    if (this.validationForm.valid) {
      this.saveAddressData();
    } else {
      this.showFirstFormError();
    }
  }

  showFirstFormError(): void {
    const formControlsOrder = [
      'PresentAddress',
      'PresentAddress2',
      'PresentCity',
      'PresentPostalcode',
      'PresentCountry',
      'PresentState',
      'PermanentAddress',
      'PermanentAddress2',
      'PermanentCity',
      'PermanentPostalcode',
      'PermanentCountry',
      'PermanentState'
    ];

    for (const controlName of formControlsOrder) {
      const control = this.validationForm.get(controlName);
      if (control && control.errors) {
        if (control.errors['required']) {
          this.toastr.error(this.getErrorMessage(controlName, 'required'));
          break;
        } else if (control.errors['pattern']) {
          this.toastr.error(this.getErrorMessage(controlName, 'pattern'));
          break;
        } else if (control.errors['minlength']) {
          this.toastr.error(this.getErrorMessage(controlName, 'minlength'));
          break;
        } else if (control.errors['maxlength']) {
          this.toastr.error(this.getErrorMessage(controlName, 'maxlength'));
          break;
        }
      }
    }
  }

  getErrorMessage(controlName: string, errorType: string): string {
    const errorMessages: { [key: string]: { [key: string]: string } } = {
      PresentAddress: {
        required: 'Present Address is required.',
        minlength: 'Present Address must be at least 4 characters long.',
        maxlength: 'Present Address cannot exceed 50 characters.'
      },
      PresentAddress2: {
        required: 'Present Address 2 is required.',
        minlength: 'Present Address 2 must be at least 4 characters long.',
        maxlength: 'Present Address 2 cannot exceed 50 characters.'
      },
      PresentCity: {
        required: 'Present City is required.',
        maxlength: 'Present City cannot exceed 30 characters.',
        pattern: 'Present City must contain only letters and spaces.'
      },
      PresentPostalcode: {
        required: 'Present Postal Code is required.',
        maxlength: 'Present Postal Code cannot exceed 6 characters.'
      },
      PresentCountry: {
        required: 'Present Country is required.'
      },
      PresentState: {
        required: 'Present State is required.'
      },
      PermanentAddress: {
        required: 'Permanent Address is required.',
        minlength: 'Permanent Address must be at least 4 characters long.',
        maxlength: 'Permanent Address cannot exceed 50 characters.'
      },
      PermanentAddress2: {
        required: 'Permanent Address 2 is required.',
        minlength: 'Permanent Address 2 must be at least 4 characters long.',
        maxlength: 'Permanent Address 2 cannot exceed 50 characters.'
      },
      PermanentCity: {
        required: 'Permanent City is required.',
        maxlength: 'Permanent City cannot exceed 30 characters.',
        pattern: 'Permanent City must contain only letters and spaces.'
      },
      PermanentPostalcode: {
        required: 'Permanent Postal Code is required.',
        maxlength: 'Permanent Postal Code cannot exceed 6 characters.'
      },
      PermanentCountry: {
        required: 'Permanent Country is required.'
      },
      PermanentState: {
        required: 'Permanent State is required.'
      }
    };

    return errorMessages[controlName][errorType];
  }

  saveAddressData(): void {
    const addressDetails = {
      PresentAddress: this.validationForm.value.PresentAddress,
      PresentAddress2: this.validationForm.value.PresentAddress2,
      PresentCity: this.validationForm.value.PresentCity,
      PresentPostalcode: this.validationForm.value.PresentPostalcode,
      PresentCountry: this.getSelectedName(this.presentCountryList, this.validationForm.value.PresentCountry),
      PresentState: this.validationForm.value.PresentState,
      PermanentAddress: this.validationForm.value.PermanentAddress,
      PermanentAddress2: this.validationForm.value.PermanentAddress2,
      PermanentCity: this.validationForm.value.PermanentCity,
      PermanentPostalcode: this.validationForm.value.PermanentPostalcode,
      PermanentCountry: this.getSelectedName(this.permanentCountryList, this.validationForm.value.PermanentCountry),
      PermanentState: this.validationForm.value.PermanentState,
      isActive: true,
      createdOn: new Date().toISOString(),
      createdBy: "",
      updatedBy: "",
      updatedOn: new Date().toISOString(),
    };

    this.employeeService.saveEmpAddressDetail(addressDetails).subscribe(
      () => {
        this.toastr.success('Address added');
        this.validationForm.reset();
      },
      (error) => {
        console.error(error);
        this.toastr.error('Something went wrong while saving the Address details');
      }
    );
  }

  toggleForm(event: any): void {
    if (event.target.checked) {
      // If toggle is checked, copy present address details to permanent address
      this.validationForm.patchValue({
        PermanentAddress: this.validationForm.value.PresentAddress,
        PermanentAddress2: this.validationForm.value.PresentAddress2,
        PermanentCity: this.validationForm.value.PresentCity,
        PermanentPostalcode: this.validationForm.value.PresentPostalcode,
        PermanentCountry: this.validationForm.value.PresentCountry,
        PermanentState: this.validationForm.value.PresentState
      });
    } else {
      // If toggle is unchecked, reset permanent address details
      this.validationForm.patchValue({
        PermanentAddress: null,
        PermanentAddress2: null,
        PermanentCity: null,
        PermanentPostalcode: null,
        PermanentCountry: null,
        PermanentState: null
      });
    }
  }

  //Country Dropdown/
  //Country Dropdown/
  getSelectedName(list: any, id: any): string {
    const selectedItem = list.find(item => item.id === id);
    return selectedItem ? selectedItem.name : '';
  }
  presentCountryList: Array<any> = [];
  presentStateList: Array<any> = [];
  dtTrigger: Subject<any> = new Subject<any>();

  getpresentCountryList() {
    this.employeeService.getAllCountrys('Country')
      .subscribe(res => {
        this.presentCountryList = res.map((country: any) => ({
          id: country.countryId,
          name: country.countryName
        }));
        this.dtTrigger.next(null);
      });
  }
  handlePresentCountryInput(event: any) {
    const countryId = parseInt(event.target.value);
    this.countryInputVal = countryId
    this.getPresentStateList(countryId);
  }

   // FUNCTION TO FILTER DESIGNATIONS
   filterDesig(country: any, countryId: any) {
    return country.countryId == countryId
  }
  getPresentStateList(stateId: any) {
    this.employeeService.getAllState('State')
      .subscribe(res => {
        this.presentStateList = res
          .filter((country: any) => this.filterDesig(country, parseInt(stateId)))
          .map((state: any) => ({
            name: state.stateName,
            value: state.stateName
          }));
        this.dtTrigger.next(null);
      });
  }

//Permanent address binding dropdown
  permanentCountryList: Array<any> = [];
  permanentStateList: Array<any> = [];
  handlePermCountryInput(event: any) {
    const countryId = parseInt(event.target.value);
    this.permCountryInputVal = countryId
    this.getPermanentStateList(countryId);
  }
  filterPermanentState(country: any, countryId: any) {
    return country.countryId == countryId
  }
   
  getPermanentCountryList() {
    this.employeeService.getAllCountrys('Country')
      .subscribe(res => {
        this.permanentCountryList = res.map((country: any) => ({
          id: country.countryId,
          name: country.countryName
        }));
        this.dtTrigger.next(null);
      });
  }

  getPermanentStateList(stateId: any) {
    this.employeeService.getAllState('State')
      .subscribe(res => {
        this.permanentStateList = res
          .filter((country: any) => this.filterPermanentState(country, parseInt(stateId)))
          .map((state: any) => ({
            name: state.stateName,
            value: state.stateName
          }));
        this.dtTrigger.next(null);
 });
 }
 isNumberKey(event: KeyboardEvent): boolean {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }
  return true;
}
}
