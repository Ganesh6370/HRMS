import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EmployeeServiceService } from '../../employee/employee-service/employee-service.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  dtTrigger: Subject<any> = new Subject<any>()

  isEdit: boolean | null = null
  formValues: any | null = null
  educationForm: FormGroup;

  constructor(public modalRef: MdbModalRef<EducationComponent>, private employeeApiService: EmployeeServiceService,private toastr: ToastrService) {
    this.educationForm = new FormGroup({
      level: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      institute: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      specialization: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      year: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      score: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      startDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      endDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
     // remarks: new FormControl(null, { validators: Validators.required, updateOn: 'change' })
      remarks: new FormControl(null)  //added bY Aman
    })
  }

  ngOnInit() {
    this.getEducationLevelDropdownList()
  }

  //#region FORM GETTERS
  get level(): AbstractControl {
    return this.educationForm.get('level')!;
  }
  get specialization(): AbstractControl {
    return this.educationForm.get('specialization')!;
  }
  get institute(): AbstractControl {
    return this.educationForm.get('institute')!;
  }
  get year(): AbstractControl {
    return this.educationForm.get('year')!;
  }
  get score(): AbstractControl {
    return this.educationForm.get('score')!;
  }
  get startDate(): AbstractControl {
    return this.educationForm.get('startDate')!;
  }
  get endDate(): AbstractControl {
    return this.educationForm.get('endDate')!;
  }
  get remarks(): AbstractControl {
    return this.educationForm.get('remarks')!;
  }
  //#endregion

  educationLevelList: any[] = []
  educationLevelArr: string[] = []

  imageUrl: string | ArrayBuffer | null = null;

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

  getEducationLevelDropdownList() {
    this.employeeApiService.getAllDepartments('Education')
      .subscribe(res => {
        this.educationLevelList = res
        this.dtTrigger.next(null);
        console.log(this.educationLevelList);
        this.educationLevelList.forEach(education => {
          this.educationLevelArr.push(education.educationName)
        })
        console.log(this.educationLevelArr)
      })
  }

  //#region SAVE EDUCATION FORM DATA : Added by Vaibhav Bajpai : 06/05/2024
  addEducation(formObj: FormGroup) {
    if (formObj.valid) {
      formObj.markAllAsTouched()
      let data = {
        isActive: true,
      createdOn: new Date().toISOString(),
      createdBy: "",
      updatedBy: "",
      updatedOn: new Date().toISOString(),
        empRegId: 0,
        level: formObj.value.level,
        institute: formObj.value.institute,
        specialization: formObj.value.specialization,
        year: formObj.value.year,
        score: formObj.value.score,
        startDate: formObj.value.startDate,
        endDate: formObj.value.endDate,
        attachment: "string",
        remarks: formObj.value.remarks,
        educationIds: [
          0
        ]
      }
 
      this.employeeApiService.saveEducationDetails(data).subscribe((res) => {
        if (res == true) { 
          this.toastr.success('Form submitted succesfully');
                    //region added by Aman on 17-07-2024
          this.educationForm.reset();
          this.imageUrl = null;
          this.modalRef.close();
      //endregion
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
 //#region added by Amandeep Virdhi on 15-07-2024
 
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