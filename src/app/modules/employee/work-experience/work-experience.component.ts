import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
// import { workExpApiInterface } from 'src/app/shared/models/employeelist';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent {
  isEdit: boolean | null = null;
  formValues: any | null = null;
  workExpForm: FormGroup;

  constructor(public modalRef: MdbModalRef<WorkExperienceComponent>, private employeeApiService: EmployeeServiceService, private toastr: ToastrService) {
    this.workExpForm = new FormGroup({
      company: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      jobTitle: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      fromDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      toDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
     // remarks: new FormControl(null, { validators: Validators.required, updateOn: 'change' })
      remarks: new FormControl(null)   //added by AMAN
    })
  }

  imageUrl: string | ArrayBuffer | null = null;

  //#region FORM GETTERS
  get company(): AbstractControl {
    return this.workExpForm.get('company')!;
  }
  get jobTitle(): AbstractControl {
    return this.workExpForm.get('jobTitle')!;
  }
  get fromDate(): AbstractControl {
    return this.workExpForm.get('formDate')!;
  }
  get toDate(): AbstractControl {
    return this.workExpForm.get('toDate')!;
  }
  get remarks(): AbstractControl {
    return this.workExpForm.get('remarks')!;
  }
  //#endregion

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  addDepartment() {
    this.imageUrl = null;
  }

  //#region SAVE WORK EXPERIENCE FORM DATA : Added by Vaibhav Bajpai : 04/05/2024
  addWorkExp(formObj: FormGroup) {
    if (formObj.valid) {
      formObj.markAllAsTouched()
      let data = {
        isActive: true,
        createdOn: new Date().toISOString(),
        createdBy: "",
        updatedBy: "",
        updatedOn: new Date().toISOString(),
        empRegId:"",
        company: formObj.value.company,
        jobTitle: formObj.value.jobTitle,
        fromDate: formObj.value.fromDate,
        toDate: formObj.value.toDate,
        attachment: "string",
        remarks: formObj.value.remarks,
        workExpIds: [
          0
        ]
      }

      this.employeeApiService.saveWorkExpData(data).subscribe((res) => {
        if (res == true) {
          this.toastr.success('Form submitted succesfully');
        }
        else {
          console.log(res)
        }
      })
    }
    else {
      this.toastr.error('Please fill all details');
    }
  }
  //#endregion
}