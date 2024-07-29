import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { skillInterface } from 'src/app/shared/models/employeelist';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  isEdit : boolean | null = null;
  formValues : any | null = null;
  skillForm: FormGroup;
 
  constructor(public modalRef: MdbModalRef<SkillsComponent>, private employeeApiService: EmployeeServiceService,private toastr: ToastrService) {
    this.skillForm = new FormGroup({
      skill: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      exp: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      //remarks: new FormControl(null, { validators: Validators.required, updateOn: 'change' })
      remarks: new FormControl(null)  //added bY Aman
    })
  }

  //#region FORM GETTERS
  get skill(): AbstractControl {
    return this.skillForm.get('skill')!;
  }
  get exp(): AbstractControl {
    return this.skillForm.get('exp')!;
  }
  get remarks(): AbstractControl {
    return this.skillForm.get('remarks')!;
  } 
  ngOnInit(): void {
  

  }

 
 //#region SUBMIT Skill DETAILS : added by satyam 02/06/2024
 saveskillForm(formObj: FormGroup) {
  if (formObj.valid) {
    formObj.markAllAsTouched()
    let data = {
      isActive: true,
      createdOn: new Date().toISOString(),
      createdBy: "",
      updatedBy: "",
      updatedOn: new Date().toISOString(),
      skillName: formObj.value.skill,
      empRegId:"",
      yearofExperience: formObj.value.exp,
      attachment: "string",
      remarks: formObj.value.remarks,
      skillIds: [
        0
      ]
    }
 
    this.employeeApiService.saveSkillDetails(data).subscribe((res) => {
      if (res == true) { 
        this.toastr.success('Form submitted succesfully');
      }
      else { 
        this.toastr.error('Please fill all details');
      }
    })
  }
  else { 
    this.toastr.error('Please fill all details');
  }
}
//#endregion

//#region added by Amandeep Virdhi on 17-07-2024
isNumberKey(event: KeyboardEvent): boolean {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }
  return true;
}
//#endregion
}