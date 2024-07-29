import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { ToastrService } from 'ngx-toastr';
import { empfamilyList, familyList } from 'src/app/shared/models/employeelist';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {
  validationForm!: FormGroup;

  familyList: Array<familyList> = [];
  familyId: string | null = null;

  constructor(private employeeService: EmployeeServiceService, private toastr: ToastrService) {


    this.validationForm = new FormGroup({
      Relation: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      Name: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern("^[a-zA-Z\\. ]*$")], updateOn: 'change' }),
      DateOfBirth: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      // ContactNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^\\+?[0-9]{10,12}$")], updateOn: 'change' }),
      ContactNo: new FormControl(null, { validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]{10}$")], updateOn:'change'}),
    });
  }
  ngOnInit(): void {
    this.loadFamilyOptions();

  }
  get Relation(): AbstractControl {
    return this.validationForm.get('Relation')!;
  }
  get Name(): AbstractControl {
    return this.validationForm.get('Name')!;
  }
  get DateOfBirth(): AbstractControl {
    return this.validationForm.get('DateOfBirth')!;
  }
  get ContactNo(): AbstractControl {
    return this.validationForm.get('ContactNo')!;
  }

  onSubmit(validationForm: FormGroup): void {
    this.validationForm.markAllAsTouched();
    if (validationForm.valid) {
      this.saveFamilydata();
    } else {
      // Display specific error messages for each field
  // Relation
  if (validationForm.get('Relation')?.errors?.['required']) {
    this.toastr.error('Relation is required.');
  }

  // Name
  else if (validationForm.get('Name')?.errors?.['required']) {
    this.toastr.error('Name is required.');
  } else if (validationForm.get('Name')?.errors?.['minlength']) {
    this.toastr.error('Name must be at least 4 characters long.');
  } else if (validationForm.get('Name')?.errors?.['maxlength']) {
    this.toastr.error('Name cannot exceed 25 characters.');
  } else if (validationForm.get('Name')?.errors?.['pattern']) {
    this.toastr.error('Name must contain only alphabets and spaces.');
  }

  // Date of Birth
  else if (validationForm.get('DateOfBirth')?.errors?.['required']) {
    this.toastr.error('Date of Birth is required.');
  }

  // Contact No
  else if (validationForm.get('ContactNo')?.errors?.['required']) {
    this.toastr.error('Contact No is required.');
 }
    }
  }
  

 
  saveFamilydata() {

    const familyDetails = {
      createdBy: "1",
      // updatedBy: "1",
      relation: this.validationForm.value.Relation,
      name: this.validationForm.value.Name.trim(),
      dateOfBirth: this.validationForm.value.DateOfBirth,
      contactNo: this.validationForm.value.ContactNo.trim(),
    };

    this.employeeService.saveEmpFamilyDetail(familyDetails).subscribe(
      () => {
        this.toastr.success('Family added');
        this.validationForm.reset()
        this.validationForm.get('dateOfBirth')?.setValue('')
        location.reload();
      },
      (error) => {
        console.error(error);
        this.toastr.error('Something went wrong while saving the Family details');
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
familyOptions: any[] = [];

  loadFamilyOptions() {
    this.employeeService.getAllEmpfamily().subscribe(options => {
      this.familyOptions = options;
 });
 }
}