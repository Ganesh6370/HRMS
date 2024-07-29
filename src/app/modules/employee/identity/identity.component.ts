import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {
  validationForm!: FormGroup;

  constructor(private employeeService: EmployeeServiceService, private toastr: ToastrService) {
    this.validationForm = new FormGroup({
     // AadhaarNo: new FormControl(null, { validators: [Validators.required, Validators.maxLength(14), Validators.pattern("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")], updateOn:'change'}),
       //AadhaarNo: new FormControl(null, { validators: [Validators.required, Validators.maxLength(14), Validators.pattern("^[0-9]*$")], updateOn: 'change' }),
       AadhaarNo: new FormControl(null, { validators: [Validators.required, Validators.maxLength(14), Validators.pattern("^[2-9]{1}[0-9]{11}$")], updateOn:'change'}),
      NameAsAadhaar: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern("^[a-zA-Z\\. ]*$")], updateOn: 'change' }),
      DobAsAadhaar: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      AadhaarAttach: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      //PanNo: new FormControl(null, { validators: [Validators.required, Validators.maxLength(10)], updateOn: 'change' }),
      PanNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")], updateOn: 'change' }),
      NameAsPan: new FormControl(null, { validators: [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern("^[a-zA-Z\\. ]*$")], updateOn: 'change' }),
      DobAsPan: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      PanAttach: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      PassportNo: new FormControl(null, { validators: [ Validators.maxLength(12)], updateOn: 'change' }),
      PassportType: new FormControl(null, {  updateOn: 'change' }),
      PassportVaildTill: new FormControl(null, {  updateOn: 'change' }),
      PassportAttach: new FormControl(null, {  updateOn: 'change' }),
      DlNo: new FormControl(null, { validators: [ Validators.maxLength(16)], updateOn: 'change' }),
      DlVaildTill: new FormControl(null, {  updateOn: 'change' }),
      DobAsDL: new FormControl(null, {  updateOn: 'change' }),
      DlAttach: new FormControl(null, { updateOn: 'change' }),
    });
  }

  get AadhaarNo(): AbstractControl {
    return this.validationForm.get('AadhaarNo')!;
  }
  get NameAsAadhaar(): AbstractControl {
    return this.validationForm.get('NameAsAadhaar')!;
  }
  get DobAsAadhaar(): AbstractControl {
    return this.validationForm.get('DobAsAadhaar')!;
  }
  get AadhaarAttach(): AbstractControl {
    return this.validationForm.get('AadhaarAttach')!;
  }
  get PanNo(): AbstractControl {
    return this.validationForm.get('PanNo')!;
  }
  get NameAsPan(): AbstractControl {
    return this.validationForm.get('NameAsPan')!;
  }
  get DobAsPan(): AbstractControl {
    return this.validationForm.get('DobAsPan')!;
  }
  get PanAttach(): AbstractControl {
    return this.validationForm.get('PanAttach')!;
  }
  get PassportNo(): AbstractControl {
    return this.validationForm.get('PassportNo')!;
  }
  get PassportType(): AbstractControl {
    return this.validationForm.get('PassportType')!;
  }
  get PassportVaildTill(): AbstractControl {
    return this.validationForm.get('PassportVaildTill')!;
  }
  get PassportAttach(): AbstractControl {
    return this.validationForm.get('PassportAttach')!;
  }
  get DlNo(): AbstractControl {
    return this.validationForm.get('DlNo')!;
  }
  get DlVaildTill(): AbstractControl {
    return this.validationForm.get('DlVaildTill')!;
  }
  get DobAsDL(): AbstractControl {
    return this.validationForm.get('DobAsDL')!;
  }
  get DlAttach(): AbstractControl {
    return this.validationForm.get('DlAttach')!;
  }
  
 
  updateImagePreview(file: File, controlName: string): void {
    const control = this.validationForm.get(controlName);
    if (control) {
      const objectURL = this.getObjectURL(file);
      control['previewURL'] = objectURL; // Store the preview URL in the control object
      this.selectedFile = file; // Set the selected file property
    }
  }
 


  onSubmit(validationForm: FormGroup): void {
    this.validationForm.markAllAsTouched();
    if (validationForm.valid) {
      this.saveIdentitydata();
    } else {
      // Display specific error messages for each field
      // Aadhaar No
      if (validationForm.get('AadhaarNo')?.errors?.['required']) {
        this.toastr.error('Aadhaar Number is required.');
      } else if (validationForm.get('AadhaarNo')?.errors?.['maxlength']) {
        this.toastr.error('Aadhaar Number cannot exceed 12 characters.');
      } else if (validationForm.get('AadhaarNo')?.errors?.['pattern']) {
        this.toastr.error('Aadhaar Number must contain only numbers.');
      }

      // Name As Aadhaar
      else if (validationForm.get('NameAsAadhaar')?.errors?.['required']) {
        this.toastr.error('Name as per Aadhaar is required.');
      } else if (validationForm.get('NameAsAadhaar')?.errors?.['minlength']) {
        this.toastr.error('Name as per Aadhaar must be at least 4 characters long.');
      } else if (validationForm.get('NameAsAadhaar')?.errors?.['maxlength']) {
        this.toastr.error('Name as per Aadhaar cannot exceed 25 characters.');
      } else if (validationForm.get('NameAsAadhaar')?.errors?.['pattern']) {
        this.toastr.error('Name as per Aadhaar must contain only alphabets and spaces.');
      }

      // Date of Birth As Aadhaar
      else if (validationForm.get('DobAsAadhaar')?.errors?.['required']) {
        this.toastr.error('Date of Birth as per Aadhaar is required.');
      }

      // Aadhaar Attachment
      else if (validationForm.get('AadhaarAttach')?.errors?.['required']) {
        this.toastr.error('Aadhaar Attachment is required.');
      }

      // Pan No
      else if (validationForm.get('PanNo')?.errors?.['required']) {
        this.toastr.error('PAN Number is required.');
      } else if (validationForm.get('PanNo')?.errors?.['maxlength']) {
        this.toastr.error('PAN Number cannot exceed 10 characters.');
      }

      // Name As Pan
      else if (validationForm.get('NameAsPan')?.errors?.['required']) {
        this.toastr.error('Name as per PAN is required.');
      } else if (validationForm.get('NameAsPan')?.errors?.['minlength']) {
        this.toastr.error('Name as per PAN must be at least 4 characters long.');
      } else if (validationForm.get('NameAsPan')?.errors?.['maxlength']) {
        this.toastr.error('Name as per PAN cannot exceed 25 characters.');
      } else if (validationForm.get('NameAsPan')?.errors?.['pattern']) {
        this.toastr.error('Name as per PAN must contain only alphabets and spaces.');
      }

      // Date of Birth As Pan
      else if (validationForm.get('DobAsPan')?.errors?.['required']) {
        this.toastr.error('Date of Birth as per PAN is required.');
      }

      // Pan Attachment
      else if (validationForm.get('PanAttach')?.errors?.['required']) {
        this.toastr.error('PAN Attachment is required.');
      }

       
    }
  }


  ngOnInit(): void {
    this.validationForm.get('AadhaarNo')?.valueChanges.subscribe(value => {
      const formattedValue = this.formatAadhaar(value);
      if (formattedValue !== value) {
        this.validationForm.get('AadhaarNo')?.setValue(formattedValue, { emitEvent: false });
 }
    });
  }
  formatAadhaar(value: string): string {
    const digits = value.replace(/\D/g, '').substring(0, 12);
    return digits;
 }
  saveIdentitydata() {

    const identityDetails = {
      "isActive": true,
      createdBy: "",
      updatedBy: "",
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
      aadhaarNo: this.validationForm.value.AadhaarNo,
      nameAsAadhaar: this.validationForm.value.NameAsAadhaar,
      dobAsAadhaar: this.validationForm.value.DobAsAadhaar,
      aadhaarAttach: this.validationForm.value.AadhaarAttach,
      panNo: this.validationForm.value.PanNo,
      nameAsPan: this.validationForm.value.NameAsPan,
      dobAsPan: this.validationForm.value.DobAsPan,
      panAttach: this.validationForm.value.PanAttach,
      passportNo: this.validationForm.value.PassportNo ? this.validationForm.value.PassportNo : null,
      passportType: this.validationForm.value.PassportType ? this.validationForm.value.PassportType : null,
      passportVaildTill: this.validationForm.value.PassportVaildTill ? this.validationForm.value.PassportVaildTill : null,
      passportAttach: this.validationForm.value.PassportAttach ? this.validationForm.value.PassportAttach : null,
      dlNo: this.validationForm.value.DlNo ? this.validationForm.value.DlNo : null,
      dlVaildTill: this.validationForm.value.DlVaildTill ? this.validationForm.value.DlVaildTill : null,
      dobAsDL: this.validationForm.value.DobAsDL ? this.validationForm.value.DobAsDL : null,
      dlAttach: this.validationForm.value.DlAttach ? this.validationForm.value.DlAttach : null,
    };

    this.employeeService.saveEmpIdentityDetail(identityDetails).subscribe(
      () => {
        this.toastr.success('Identity added');
        this.validationForm.reset()
        this.selectedFile=null;
        this.selectedPanFile=null;
        this.selectedPassportFile=null;
        this.selectedDLFile=null;
        location.reload();
      },
      (error) => {
        console.error(error);
        this.toastr.error('Something went wrong while saving the Identity details');

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

/////Adhar Attach////////////
selectedFile: File | null = null;
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}
getObjectURL(file: File): string {
  return URL.createObjectURL(file);
}
getImageURL(imageFileName: string): string {
  // Assuming that your images are stored in a specific directory (e.g., 'assets/category-icons/')
  return `assets/img/${imageFileName}`;
}

/////Pan Attach////////////
selectedPanFile: File | null = null;
onFileSelectedPan(event: any) {
  this.selectedPanFile = event.target.files[0];
}
getObjectPanURL(file: File): string {
  return URL.createObjectURL(file);
}
getImagePanURL(imageFileName: string): string {
  // Assuming that your images are stored in a specific directory (e.g., 'assets/category-icons/')
  return `assets/img/${imageFileName}`;
}

/////Passport Attach////////
selectedPassportFile: File | null = null;
onFileSelectedPassport(event: any) {
  this.selectedPassportFile = event.target.files[0];
}
getObjecPassporttURL(file: File): string {
  return URL.createObjectURL(file);
}
getImagePassportURL(imageFileName: string): string {
  // Assuming that your images are stored in a specific directory (e.g., 'assets/category-icons/')
  return `assets/img/${imageFileName}`;
}

//////DL Attach//////////////
selectedDLFile: File | null = null;
onFileSelectedDL(event: any) {
  this.selectedDLFile = event.target.files[0];
}
getObjectURLDL(file: File): string {
  return URL.createObjectURL(file);
}
getImageURLDL(imageFileName: string): string {
  // Assuming that your images are stored in a specific directory (e.g., 'assets/category-icons/')
  return `assets/img/${imageFileName}`;
 }

}