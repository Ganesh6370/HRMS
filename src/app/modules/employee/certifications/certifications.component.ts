import { Component } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { certApiInterface, skillList } from 'src/app/shared/models/employeelist';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent {
  isEdit: boolean | null = null;
  formValues: any | null = null;
  certForm: FormGroup;
  skillList: Array<skillList> = [];
  skillId: string | null = null;

  constructor(public modalRef: MdbModalRef<CertificationsComponent>, private employeeApiService: EmployeeServiceService, private toastr: ToastrService,) {
    this.certForm = new FormGroup({
      skill: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      exp: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      remarks: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.loadEmpSkillList();
  }

  //#region FORM GETTERS
  get skill(): AbstractControl {
    return this.certForm.get('skill')!;
  }
  get exp(): AbstractControl {
    return this.certForm.get('exp')!;
  }
  get remarks(): AbstractControl {
    return this.certForm.get('remarks')!;
  }
  //#endregion

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

  //#region SUBMIT LANGUAGE DETAILS : added by Vaibhav 30/05/2024
  saveCertForm(formObj: FormGroup) {
    if (formObj.valid) {
      formObj.markAllAsTouched()
      let data = {
        isActive: true,
        createdOn: new Date().toISOString(),
        createdBy: "",
        updatedBy: "",
        updatedOn: new Date().toISOString(),
        skill: formObj.value.skill,
        yearOfExperience: formObj.value.exp,
        attachment: "string",
        remarks: formObj.value.remarks,
        certificationIds: [
          0
        ]
      }
 
      this.employeeApiService.saveCertDetails(data).subscribe((res) => {
        if (res == true) { 
          this.toastr.success('Form submitted succesfully')
          //region added by Amandeep Virdhi on 17-07-2024 
          this.certForm.reset();
          this.imageUrl = null;
          this.modalRef.close();
      //endregion
        }
        else {
          this.toastr.error('Something went wrong') 
          console.log(res)
        }
      })
    }
    else { 
      this.toastr.error('Please fill all details')
    }
  }
  //#endregion

  EmpSkillList: any[] = [];
  loadEmpSkillList() {
    this.employeeApiService.getEmpSkillList().subscribe(options => {
      this.EmpSkillList = options;
    });
    // this.employeeApiService.getEmpSkillList()
    //   .subscribe(res => {
    //     this.skillList = res;
    //     console.log(this.skillList);
    //   })
  }
  handleSkillInput(event: any) {
    const deptId = event.target.value;
    // console.log(typeof (deptId))
  }

  //#region added by Amandeep Virdhi on 17-07-2024
  isNumberKey(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
 //endregion
}
