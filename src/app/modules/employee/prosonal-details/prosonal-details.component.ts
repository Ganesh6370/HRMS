import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval, take } from 'rxjs';

@Component({
  selector: 'app-prosonal-details',
  templateUrl: './prosonal-details.component.html',
  styleUrls: ['./prosonal-details.component.scss']
})
export class ProsonalDetailsComponent implements OnInit {
  validationForm!: FormGroup;
  
  constructor(private employeeService: EmployeeServiceService, private toastr: ToastrService) { 
    this.validationForm = new FormGroup({
      fullname: new FormControl(null, { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("^[a-zA-Z\\. ]*$")], updateOn: 'change' }),
      Dob: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      Gender: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      Bloodgroup: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      Religion: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      Fatherhusbandname: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(35), Validators.pattern("^[a-zA-Z\\. ]*$")], updateOn: 'change' }),
      Maritalstatus: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      Domarriage: new FormControl({ value: null, disabled: true }, Validators.required),
      Mobilenumber: new FormControl(null, { validators: [Validators.required,Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]{10}$")], updateOn:'change'}),
      Emailid: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'change' }),
    });

    this.validationForm.get('Maritalstatus')?.valueChanges.subscribe(value => {
      const dateOfMarriageControl = this.validationForm.get('Domarriage');
      if (value === 'Married') { 
        dateOfMarriageControl?.enable();
      } else {
        dateOfMarriageControl?.disable();
        dateOfMarriageControl?.setValue(null);
      }
    });
  }

  get fullname(): AbstractControl {
    return this.validationForm.get('fullname')!;
  }
  get Dob(): AbstractControl {
    return this.validationForm.get('Dob')!;
  } 
  get Gender(): AbstractControl {
    return this.validationForm.get('Gender')!;
  } 
  get Bloodgroup(): AbstractControl {
    return this.validationForm.get('Bloodgroup')!;
  } 
  get Religion(): AbstractControl {
    return this.validationForm.get('Religion')!;
  } 
  get Fatherhusbandname(): AbstractControl {
    return this.validationForm.get('Fatherhusbandname')!;
  } 
  get Maritalstatus(): AbstractControl {
    return this.validationForm.get('Maritalstatus')!;
  } 
  get Domarriage(): AbstractControl {
    return this.validationForm.get('Domarriage')!;
  } 
  get Mobilenumber(): AbstractControl {
    return this.validationForm.get('Mobilenumber')!;
  } 
  get Emailid(): AbstractControl {
    return this.validationForm.get('Emailid')!;
  }

  showFirstError(): void {
    // Full Name
    if (this.fullname.invalid) {
      if (this.fullname.errors?.['required']) {
        this.toastr.error('Full Name is required.');
      } else if (this.fullname.errors?.['minlength']) {
        this.toastr.error('Full Name must be at least 2 characters long.');
      } else if (this.fullname.errors?.['maxlength']) {
        this.toastr.error('Full Name cannot exceed 35 characters.');
      } else if (this.fullname.errors?.['pattern']) {
        this.toastr.error('Full Name must contain only letters, dots, and spaces.');
      }
      return;
    }
  
    // Date of Birth
    if (this.Dob.invalid) {
      if (this.Dob.errors?.['required']) {
        this.toastr.error('Date of Birth is required.');
      }
      return;
    }
  
    // Gender
    if (this.Gender.invalid) {
      if (this.Gender.errors?.['required']) {
        this.toastr.error('Gender is required.');
      }
      return;
    }
  
    // Blood Group
    if (this.Bloodgroup.invalid) {
      if (this.Bloodgroup.errors?.['required']) {
        this.toastr.error('Blood Group is required.');
      }
      return;
    }
  
    // Religion
    if (this.Religion.invalid) {
      if (this.Religion.errors?.['required']) {
        this.toastr.error('Religion is required.');
      }
      return;
    }
  
    // Father/Husband Name
    if (this.Fatherhusbandname.invalid) {
      if (this.Fatherhusbandname.errors?.['required']) {
        this.toastr.error('Father/Husband Name is required.');
      } else if (this.Fatherhusbandname.errors?.['minlength']) {
        this.toastr.error('Father/Husband Name must be at least 4 characters long.');
      } else if (this.Fatherhusbandname.errors?.['maxlength']) {
        this.toastr.error('Father/Husband Name cannot exceed 35 characters.');
      } else if (this.Fatherhusbandname.errors?.['pattern']) {
        this.toastr.error('Father/Husband Name must contain only letters, dots, and spaces.');
      }
      return;
    }
  
    // Marital Status
    if (this.Maritalstatus.invalid) {
      if (this.Maritalstatus.errors?.['required']) {
        this.toastr.error('Marital Status is required.');
      }
      return;
    }
  
    // Date of Marriage
    if (this.Domarriage.enabled && this.Domarriage.invalid) {
      if (this.Domarriage.errors?.['required']) {
        this.toastr.error('Date of Marriage is required.');
      }
      return;
    }
  
    // Mobile Number
    if (this.Mobilenumber.invalid) {
      if (this.Mobilenumber.errors?.['required']) {
        this.toastr.error('Mobile Number is required.');
      } else if (this.Mobilenumber.errors?.['pattern']) {
        this.toastr.error('Mobile Number must be a 10 or 12-digit number and may start with a "+" sign.');
      }
      return;
    }
  
    // Email Address
    if (this.Emailid.invalid) {
      if (this.Emailid.errors?.['required']) {
        this.toastr.error('Email Address is required.');
      } else if (this.Emailid.errors?.['email']) {
        this.toastr.error('Invalid Email Address.');
      }
      return;
    }
  
    // No errors found, proceed to submit
    this.toastr.success('All fields are valid!');
  }

  onSubmit(validationForm: FormGroup): void {
    this.validationForm.markAllAsTouched();
    if (validationForm.valid) {
      this.saveproductdata();
    } else {
      this.showFirstError();
    }
  }

  ngOnInit(): void {
  }
  private updateSubscription!: Subscription;
  saveproductdata() {
    const empDetails = {
      createdBy: "",
      updatedBy: "",
      fullName: this.validationForm.value.fullname.trim(),
      dob: this.validationForm.value.Dob,
      gender: this.validationForm.value.Gender.trim(),
      bloodGroup: this.validationForm.value.Bloodgroup.trim(),
      reliegion: this.validationForm.value.Religion.trim(),
      fatherorHusbandName: this.validationForm.value.Fatherhusbandname.trim(),
      maritalStatus: this.validationForm.value.Maritalstatus.trim(),
      dateofMarriage: this.validationForm.value.Domarriage ? this.validationForm.value.Domarriage.trim() : null,
      mobileNo: this.validationForm.value.Mobilenumber.trim(),
      email: this.validationForm.value.Emailid.trim()
    };

    this.employeeService.saveEmpPersonalDetail(empDetails).subscribe(
      () => {
        this.toastr.success('Employee added');
        this.validationForm.reset();
        this.validationForm.get('Dob')?.setValue('');
        this.validationForm.get('Domarriage')?.setValue('');

        this.updateSubscription = interval(0).pipe(
          take(1) 
        ).subscribe(() => {
          // Reload the page after the delay
          location.reload();
 });
      },
      (error) => {
        console.error(error);
        this.toastr.error('Something went wrong while saving the employee details');
      }
    );
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