
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  validationForm!: FormGroup;

  constructor(private employeeService: EmployeeServiceService, private toastr: ToastrService) {
    this.validationForm = new FormGroup({
      MobileNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^\\+?[0-9]{10,12}$")], updateOn: 'change' }),
     // AlternateMobile: new FormControl(null, { validators: [ Validators.pattern("^\\+?[0-9]{10,12}$")], updateOn: 'change' }),
      AlternateMobile: new FormControl(null),
      PersonalEmailId: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'change' }),
      //ProfessionalEmailId: new FormControl(null, { validators: [Validators.email], updateOn: 'change' }),
      ProfessionalEmailId: new FormControl(null),
      HomeTelephone: new FormControl(null, { validators: [Validators.required, Validators.pattern("^\\+?[0-9]{10,12}$")], updateOn: 'change' }),
      EmergencyContactPersonName: new FormControl(null, { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern("^[a-zA-Z\\. ]*$")], updateOn: 'change' }),
      RelationshipWithContactPerson: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      ContactPersonNumber: new FormControl(null, { validators: [Validators.required, Validators.pattern("^\\+?[0-9]{10,12}$")], updateOn: 'change' }),
      ContactPersonAddress: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)], updateOn: 'change' }),
      AlternateEmergencyContactPersonName: new FormControl(null, { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern("^[a-zA-Z\\. ]*$")], updateOn: 'change' }),
      AlternateRelationshipWithContactPerson: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      AlternateContactPersonNumber: new FormControl(null, { validators: [Validators.required, Validators.pattern("^\\+?[0-9]{10,12}$")], updateOn: 'change' }),
      AlternateContactPersonAddress: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)], updateOn: 'change' }),
    });
  }

  ngOnInit(): void {
    this.loadFamilyOptions();
  }

  get MobileNo(): AbstractControl {
    return this.validationForm.get('MobileNo')!;
  }
  get AlternateMobile(): AbstractControl {
    return this.validationForm.get('AlternateMobile')!;
  }
  get PersonalEmailId(): AbstractControl {
    return this.validationForm.get('PersonalEmailId')!;
  }
  get ProfessionalEmailId(): AbstractControl {
    return this.validationForm.get('ProfessionalEmailId')!;
  }
  get HomeTelephone(): AbstractControl {
    return this.validationForm.get('HomeTelephone')!;
  }
  get EmergencyContactPersonName(): AbstractControl {
    return this.validationForm.get('EmergencyContactPersonName')!;
  }
  get RelationshipWithContactPerson(): AbstractControl {
    return this.validationForm.get('RelationshipWithContactPerson')!;
  }
  get ContactPersonNumber(): AbstractControl {
    return this.validationForm.get('ContactPersonNumber')!;
  }
  get ContactPersonAddress(): AbstractControl {
    return this.validationForm.get('ContactPersonAddress')!;
  }
  get AlternateEmergencyContactPersonName(): AbstractControl {
    return this.validationForm.get('AlternateEmergencyContactPersonName')!;
  }
  get AlternateRelationshipWithContactPerson(): AbstractControl {
    return this.validationForm.get('AlternateRelationshipWithContactPerson')!;
  }
  get AlternateContactPersonNumber(): AbstractControl {
    return this.validationForm.get('AlternateContactPersonNumber')!;
  }
  get AlternateContactPersonAddress(): AbstractControl {
    return this.validationForm.get('AlternateContactPersonAddress')!;
  }

  onSubmit(validationForm: FormGroup): void {
    this.validationForm.markAllAsTouched();
    console.log(validationForm.value);

    if (validationForm.valid) {
      this.saveContactData();
    } else {
      this.showFirstFormError(validationForm);
    }
  }

  showFirstFormError(form: FormGroup): void {
    const formControlsOrder = [
      'MobileNo', 
      'PersonalEmailId', 
      'HomeTelephone',
      'EmergencyContactPersonName',
      'RelationshipWithContactPerson',
      'ContactPersonNumber',
      'ContactPersonAddress',
      'AlternateEmergencyContactPersonName',
      'AlternateRelationshipWithContactPerson',
      'AlternateContactPersonNumber',
      'AlternateContactPersonAddress'
    ];

    for (const controlName of formControlsOrder) {
      const control = form.get(controlName);
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
        } else if (control.errors['email']) {
          this.toastr.error(this.getErrorMessage(controlName, 'email'));
          break;
        }
      }
    }
  }

  getErrorMessage(controlName: string, errorType: string): string {
    const errorMessages: { [key: string]: { [key: string]: string } } = {
      MobileNo: {
        required: 'Mobile Number is required.',
        pattern: 'Mobile Number must be a 10 or 12-digit number and may start with a "+" sign.'
      },
      
      PersonalEmailId: {
        required: 'Personal Email Address is required.',
        email: 'Invalid Personal Email Address.'
      },
       
      HomeTelephone: {
        required: 'Home Telephone is required.',
        pattern: 'Home Telephone must be a 10 or 12-digit number and may start with a "+" sign.'
      },
      EmergencyContactPersonName: {
        required: 'Emergency Contact Person Name is required.',
        minlength: 'Emergency Contact Person Name must be at least 2 characters long.',
        maxlength: 'Emergency Contact Person Name cannot exceed 25 characters.',
        pattern: 'Emergency Contact Person Name must contain only letters and spaces.'
      },
      RelationshipWithContactPerson: {
        required: 'Relationship With Contact Person is required.'
      },
      ContactPersonNumber: {
        required: 'Contact Person Number is required.',
        pattern: 'Contact Person Number must be a 10 or 12-digit number and may start with a "+" sign.'
      },
      ContactPersonAddress: {
        required: 'Contact Person Address is required.',
        minlength: 'Contact Person Address must be at least 4 characters long.',
        maxlength: 'Contact Person Address cannot exceed 50 characters.'
      },
      AlternateEmergencyContactPersonName: {
        required: 'Alternate Emergency Contact Person Name is required.',
        minlength: 'Alternate Emergency Contact Person Name must be at least 2 characters long.',
        maxlength: 'Alternate Emergency Contact Person Name cannot exceed 25 characters.',
        pattern: 'Alternate Emergency Contact Person Name must contain only letters and spaces.'
      },
      AlternateRelationshipWithContactPerson: {
        required: 'Alternate Relationship With Contact Person is required.'
      },
      AlternateContactPersonNumber: {
        required: 'Alternate Contact Person Number is required.',
        pattern: 'Alternate Contact Person Number must be a 10 or 12-digit number and may start with a "+" sign.'
      },
      AlternateContactPersonAddress: {
        required: 'Alternate Contact Person Address is required.',
        minlength: 'Alternate Contact Person Address must be at least 4 characters long.',
        maxlength: 'Alternate Contact Person Address cannot exceed 50 characters.'
      }
    };

    return errorMessages[controlName][errorType];
  }

  saveContactData() {
    const contactDetails = {
      isActive: true,
      createdBy: "",
      updatedBy: "",
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
      mobileNo: this.validationForm.value.MobileNo,
      alternateMobile: this.validationForm.value.AlternateMobile ? this.validationForm.value.AlternateMobile : "",
      personalEmailId: this.validationForm.value.PersonalEmailId,
      professionalEmailId: this.validationForm.value.ProfessionalEmailId ? this.validationForm.value.ProfessionalEmailId : "",
      homeTelephone: this.validationForm.value.HomeTelephone,
      emergencyContactPersonName: this.validationForm.value.EmergencyContactPersonName,
      relationshipWithContactPerson: this.validationForm.value.RelationshipWithContactPerson,
      contactPersonNumber: this.validationForm.value.ContactPersonNumber,
      contactPersonAddress: this.validationForm.value.ContactPersonAddress,
      alternateEmergencyContactPersonName: this.validationForm.value.AlternateEmergencyContactPersonName,
      alternateRelationshipWithContactPerson: this.validationForm.value.AlternateRelationshipWithContactPerson,
      alternateContactPersonNumber: this.validationForm.value.AlternateContactPersonNumber,
      alternateContactPersonAddress: this.validationForm.value.AlternateContactPersonAddress,
      remarks: "",
      empRegId:""
    };

    this.employeeService.saveEmpcontactDetail(contactDetails).subscribe(
      () => {
        this.toastr.success('Contact added');
        this.validationForm.reset();
        location.reload();
      },
      (error) => {
        console.error(error);
        this.toastr.error('Something went wrong while saving the contact details');
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
  //#region  Added by sapna fron relations option list
  familyOptions: any[] = [];

  loadFamilyOptions() {
    this.employeeService.getAllEmpfamily().subscribe(options => {
      this.familyOptions = options;
 });
 } 
  //#endregion
}
