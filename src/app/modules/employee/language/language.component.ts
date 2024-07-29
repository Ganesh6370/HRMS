import { Component } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { languageApiInterface } from 'src/app/shared/models/employeelist';
import { EmployeeServiceService } from '../employee-service/employee-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
  isEdit: boolean | null = null;
  langList: Array<languageApiInterface> | null = null;
  formValues: any | null = null;
  langForm: FormGroup;

  constructor(public modalRef: MdbModalRef<LanguageComponent>, private employeeApiService: EmployeeServiceService,private toastr: ToastrService) {
    this.langForm = new FormGroup({
      languageName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      // skill: new FormControl(null),
      fluencyLevel: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      // document: new FormControl(null),
      remarks: new FormControl(null)
    })
  }

  ngOnInit() {

  }

  //#region FORM GETTERS
  get languageName(): AbstractControl {
    return this.langForm.get('languageName')!;
  }
  get fluencyLevel(): AbstractControl {
    return this.langForm.get('fluencyLevel')!;
  }
  get remarks(): AbstractControl {
    return this.langForm.get('remarks')!;
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
  addLanguage(formObj: FormGroup) {
    if (formObj.valid) {
      formObj.markAllAsTouched()
      let data = {
        isActive: true,
        createdOn: new Date().toISOString(),
        createdBy: "",
        updatedBy: "",
        updatedOn: new Date().toISOString(),
        languageName: formObj.value.languageName,
        fluencyLevel: formObj.value.fluencyLevel,
        remarks: formObj.value.remarks || "",
        empRegId:""
      } 
      this.employeeApiService.saveLanguageDetail(data).subscribe((res) => {
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
}