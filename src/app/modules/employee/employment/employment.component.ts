import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from './../../employee/employee-service/employee-service.service';
import { departmentList } from 'src/app/shared/models/employeelist';
import { designationList } from 'src/app/shared/models/employeelist';
import { roleList } from 'src/app/shared/models/employeelist';
import { workShiftList } from 'src/app/shared/models/employeelist';
import { workTypeList } from 'src/app/shared/models/employeelist';
import { officeList } from 'src/app/shared/models/employeelist';
import { Subject } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UtilityServiceService } from 'src/app/shared/service/Utility/utility-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss']
})


export class EmploymentComponent implements AfterViewInit,OnInit{
  hide: boolean = true;
  confirmHide:boolean=true;
  addEmployeeForm: FormGroup;
  loginForm: FormGroup;
  enableEmployeeID: boolean = false;
  date = new Date()
  showForm: boolean = false;
  departmentList: Array<any> = []
  roleList: Array<any> = []
  workShiftList: Array<any> = []
  workTypeList: Array<any> = []
  officeList: Array<any> = []
  designationList: Array<any> = []
  supervisorList: Array<any> = [];
  dtTrigger: Subject<any> = new Subject<any>();

  deptInputVal: number | null = null;
  designationInputVal: number | null = null;
  selectedEmpRegId: string | null = null;
  isChecked: boolean = false;
  showTabs3: boolean = false;
  selectedEmpId: string | null =null;

  constructor(private employeeApiService: EmployeeServiceService, private utilityService: UtilityServiceService, private toastr: ToastrService, private fb: FormBuilder, private route: ActivatedRoute, private router:  Router) {

    this.loginForm = this.fb.group({
      userName: new FormControl(null, { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("^[a-zA-Z0-9@. ]*$")], updateOn: 'change' }),
      fullName: new FormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.minLength(2), Validators.maxLength(35), Validators.pattern("^[a-zA-Z\\. ]*$")], updateOn: 'change' }),
      email: new FormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.email], updateOn: 'change' }),
      mobileNo: new FormControl({ value: '', disabled: true },{ validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]{10}$")], updateOn: 'change' }),
      password: new FormControl(null, {
        validators: [Validators.required, this.passwordValidator()],
        updateOn: 'change'
      }),
      confirmPassword: new FormControl(null, {
        validators: Validators.required,
        updateOn: 'change'
      }),
      superVisor: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      empType: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),

    }, {validators: this.passwordMatchValidator });
    this.addEmployeeForm =  this.fb.group({
      officeLocation: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      employeeStatus: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      probEndDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      dateOfPermanency: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      department: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      designation: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      supervisor: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      // employeeId: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      employeeId: new FormControl({ value: null, disabled: true }, { validators: Validators.required, updateOn: 'change' }),

      role: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      workShift: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      workType: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });

  }
  ngOnInit(): void {
    this.loadSupervisorOptions();
    this.route.queryParams.subscribe(params => {
      if (params['empId']) {
        this.selectedEmpId = params['empId'];
        this.toggleTabs3();
        this.fetchUserDetails(params['empId']);       
      }
    });
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null; // if the control is empty, no error
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const minLength = value.length >= 8;

      const passwordValid = hasUpperCase && hasNumber && hasSpecialChar && minLength;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }
  passwordMatchValidator(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  ngAfterViewInit() {
    this.getDepartmentList();
    this.getRoleList();
    this.getWorkShiftList();
    this.getOfficeList();
    this.getWorkTypeList();
    this.loadEmpTypeOptions();
    this.route.queryParams.subscribe(params => {
      this.selectedEmpRegId = params['empRegId'] || null; // Retrieve the empRegId from query params
    });
  }

  toggleForm(event: Event) {
    this.showForm = (event.target as HTMLInputElement).checked;
  }

  toggleEmployeeID(event: Event) {
    this.enableEmployeeID = (event.target as HTMLInputElement).checked;
    if (this.enableEmployeeID) {
      this.addEmployeeForm.get('employeeId')?.enable();
    } else {
      this.addEmployeeForm.get('employeeId')?.disable();
    }
  }
  //#region Add Employee Form Getters
  get officeLocation(): AbstractControl {
    return this.addEmployeeForm.get('officeLocation')!;
  }
  get employeeStatus(): AbstractControl {
    return this.addEmployeeForm.get('employeeStatus')!;
  }
  get probEndDate(): AbstractControl {
    return this.addEmployeeForm.get('probEndDate')!;
  }
  get dateOfPermanency(): AbstractControl {
    return this.addEmployeeForm.get('dateOfPermanency')!;
  }
  get department(): AbstractControl {
    return this.addEmployeeForm.get('department')!;
  }
  get designation(): AbstractControl {
    return this.addEmployeeForm.get('designation')!;
  }
  get supervisor(): AbstractControl {
    return this.addEmployeeForm.get('supervisor')!;
  }
  get employeeId(): AbstractControl {
    return this.addEmployeeForm.get('employeeId')!;
  }
  get role(): AbstractControl {
    return this.addEmployeeForm.get('role')!;
  }
  get workShift(): AbstractControl {
    return this.addEmployeeForm.get('workShift')!;
  }
  get workType(): AbstractControl {
    return this.addEmployeeForm.get('workType')!;
  }
  //#endregion



  get userName(): AbstractControl {
    return this.loginForm.get('userName')!;
  }
  get fullName(): AbstractControl {
    return this.loginForm.get('fullName')!;
  }
  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }
  get mobileNo(): AbstractControl {
    return this.loginForm.get('mobileNo')!;
  }
  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }
  get confirmPassword(): AbstractControl {
    return this.loginForm.get('confirmPassword')!;
  }
  get superVisor(): AbstractControl {
    return this.loginForm.get('superVisor')!;
  }
  get empType(): AbstractControl {
    return this.loginForm.get('empType')!;
  }
  
  toggleTabs3() {
    this.showTabs3 = !this.showTabs3;
    this.isChecked = !this.isChecked;
    if (!this.showTabs3) {
      this.loginForm.reset();
      this.selectedEmpRegId = null; 
      this.router.navigate(['../main/employee/employement']);
    }

  }
  fetchUserDetails(empRegId: string): void {
    this.employeeApiService.getEmployeeDetails(empRegId).subscribe(user => {
      this.loginForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        mobileNo: user.mobileNo
      });
    });
  }
  handleFormSubmission(loginForm: FormGroup) { 
    loginForm.markAllAsTouched();
    // console.log(loginForm.valid);
    if (loginForm.valid) {
      const formObj = {
        "isActive": true,
        "createdBy": "",
        "createdOn": new Date().toISOString(),
        "updatedBy": "",
        "updatedOn": new Date().toISOString(),
        "empRegId": this.selectedEmpId,
        "userName": loginForm.value.userName,
        "email": loginForm.getRawValue().email,
        "phoneNumber": loginForm.getRawValue().mobileNo,
        "userType": loginForm.value.empType,
        "password": loginForm.value.password,
        "fullName": loginForm.getRawValue().fullName,
        "maindata": ["string"],
        "mainMenu": "string",
        "mainWithSubMenu": "string",
        "claim2": "string"
      };

      const emailPayload = {
        "emailId": loginForm.getRawValue().email,
        "password": loginForm.value.password,
        "fullName": loginForm.getRawValue().fullName,
        "mobileNo": loginForm.getRawValue().mobileNo
      };

      this.employeeApiService.createEmpLogin(formObj).subscribe((res: any) => {
        if (res.statusCode === 403) {
          this.toastr.error(res.message);
        } else if (res.statusCode === 200) {
          this.toastr.success('Form submitted successfully');
          this.showTabs3 = false;
          this.loginForm.reset();
          this.employeeApiService.sendEmail(emailPayload).subscribe((emailRes: any) => {
            if (emailRes.statusCode === 200) {
              this.toastr.success('Email sent successfully');
            } else {
              this.toastr.error('Failed to send email');
            }
          });
        this.selectedEmpRegId = null; 
        this.router.navigate(['../main/employee/employement']);
        } else {
          this.toastr.error('Something went wrong');
        }
      });
    } else {
      if (loginForm.get('userName')?.hasError('required')) {
        this.toastr.error('UserName is required');
      }
      else if (loginForm.get('fullName')?.hasError('required')) {
        this.toastr.error('FullName is required');
      }
      else if (loginForm.get('email')?.hasError('required')) {
        this.toastr.error('Email is required');
      }
      else if (loginForm.get('mobileNo')?.hasError('required')) {
        this.toastr.error('Mobile Number is required');
      }
      else if (loginForm.get('password')?.hasError('required')) {
        this.toastr.error('Password is required');
      } else if (loginForm.get('password')?.hasError('passwordStrength')) {
        this.toastr.error('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
      }
      else if (loginForm.get('confirmPassword')?.hasError('required')) {
        this.toastr.error('Confirm Password is required');
      }
      else if (loginForm.hasError('notMatching')) {
        this.toastr.error('Passwords do not match');
      } 
      else {
        this.toastr.error('Please fill all values');
      }
    }
  }

  //#region GET ALL DEPARTMENTS : added by Vaibhav : 04/03/2024
  getDepartmentList() {
    this.employeeApiService.getAllDepartments('Department')
      .subscribe(res => {
        this.departmentList = res.map((department: any) => ({
          id: department.deptId,
          name: department.departmentName
        }));
        this.dtTrigger.next(null);
      });
  }
  //#endregion

  //#region GET ALL ROLES : added by Vaibhav : 11/03/2024
  getRoleList() {
    this.employeeApiService.getAllRoles('Role')
      .subscribe(res => {
        this.roleList = res.map((role: any) => ({
          id: role.roleName,
          name: role.roleName
        }));
        this.dtTrigger.next(null);
      });
  }
  //#endregion

  //#region GET ALL WorkShifts : added by Vaibhav : 19/04/2024
  getWorkShiftList() {
    this.employeeApiService.getAllWorkShifts('WorkShift')
      .subscribe(res => {
        this.workShiftList = res.map((workShift: any) => ({
          id: workShift.workShiftName,
          name: workShift.workShiftName,
          workFrom: workShift.workFrom,
          workTo: workShift.workTo,
        }));
        this.dtTrigger.next(null);
      });
  }
  //#endregion

  //#region GET ALL WorkTypes : added by Vaibhav : 19/04/2024
  getWorkTypeList() {
    this.employeeApiService.getAllWorkType('WorkType')
      .subscribe(res => {
        this.workTypeList = res.map((workType: any) => ({
          id: workType.workTypeName,
          name: workType.workTypeName
        }));
        this.dtTrigger.next(null);
      });
  }
  //#endregion


  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  //#region GET ALL DESIGNATIONS BY DEPARTMENT ID
  getDesignationList(deptId: any) {
    this.employeeApiService.getAllDesig('Designation')
      .subscribe(res => {
        this.designationList = res
          .filter((desig: any) => this.filterDesig(desig, parseInt(deptId)))
          .map((designation: any) => ({
            id: designation.desigId,
            name: designation.designationName
          }));
        this.dtTrigger.next(null);
      });
  }

  //#region GET ALL OFFICES
  getOfficeList() {
    this.employeeApiService.getAllOffices('Office')
      .subscribe(res => {
        this.officeList = res.map((office: any) => ({
          id: office.officeName,
          name: office.officeName
        }));
        this.dtTrigger.next(null);
      });
  }

  // FUNCTION TO FILTER DESIGNATIONS
  filterDesig(desig: any, deptId: any) {
    // console.log(desig.deptId == deptId)
    return desig.deptId == deptId
  }

  // FUNCTION TO GET DEPT ID WHEN DEPARTMENT IS SELECTED
  handleDeptInput(event: any) {
    const deptId = parseInt(event.target.value);
    this.deptInputVal = deptId
    this.getDesignationList(deptId);
    this.updateSupervisorList();
  }
  //#endregion
  handleDesignationInput(event: any) {
    const desigId = parseInt(event.target.value);
    this.designationInputVal = desigId;
    this.updateSupervisorList();
  }

  updateSupervisorList() {
    if (this.deptInputVal && this.designationInputVal) {
      this.employeeApiService.getSupervisorsByDeptAndDesig(this.deptInputVal, this.designationInputVal).subscribe(res => {
        // Assuming the API response is an array of supervisor objects
        this.supervisorList = res.map((supervisor: any) => ({
          id: supervisor.superVisorId,
          name: supervisor.superVisorName,
        }));
        this.dtTrigger.next(null);
      });
    }
  }


  //#region HANDLE SAVE BUTTON CLICK
  handleSaveBtn(addEmployeeForm: FormGroup) { 
    addEmployeeForm.markAllAsTouched()
    if (addEmployeeForm.valid) {
      const selectedWorkShift = JSON.parse(addEmployeeForm.value.workShift);
      const formObj = {
      isActive: true,
      createdBy: "", 
      updatedBy: "",
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
      empRegId: this.selectedEmpRegId || 0,
      officeLocation: addEmployeeForm.value.officeLocation,
      probationEndDate: addEmployeeForm.value.probEndDate,
      dateofPermanecy: addEmployeeForm.value.dateOfPermanency,
      designation: this.getSelectedName(this.designationList, this.addEmployeeForm.value.designation),
      department: this.getSelectedName(this.departmentList, this.addEmployeeForm.value.department),
      supervisor:  addEmployeeForm.value.supervisor.name,
      supervisorId: addEmployeeForm.value.supervisor.id,
      employeeId: addEmployeeForm.value.employeeId ? this.addEmployeeForm.value.employeeId.toString() : "",
      role: addEmployeeForm.value.role,
      workShift: `${selectedWorkShift.name} (${selectedWorkShift.workFrom} to ${selectedWorkShift.workTo})`,
      workType: addEmployeeForm.value.workType,
      employmentIds: [0],
        
      };
      this.employeeApiService.saveAddEmployeeForm(formObj).subscribe((res) => {
        this.toastr.success('Form submitted successfully');
        this.addEmployeeForm.reset();
        this.selectedEmpRegId = null; 
        this.router.navigate(['../main/employee/employement']);
        location.reload();
      })
    } else {
      // Display specific error messages for each field
      // Office Location
      if (addEmployeeForm.get('officeLocation')?.errors?.['required']) {
        this.toastr.error('Office Location is required.');
      }
      // Employee status 
      else if (addEmployeeForm.get('employeeStatus')?.errors?.['required']) {
        this.toastr.error('Employee status is required.');
      }
      // Probation End Date
      else if (addEmployeeForm.get('probEndDate')?.errors?.['required']) {
        this.toastr.error('Probation End Date is required.');
      }

      // Date of Permanency
      else if (addEmployeeForm.get('dateOfPermanency')?.errors?.['required']) {
        this.toastr.error('Date of Permanency is required.');
      }

      // Department
      else if (addEmployeeForm.get('department')?.errors?.['required']) {
        this.toastr.error('Department is required.');
      }

      // Designation
      else if (addEmployeeForm.get('designation')?.errors?.['required']) {
        this.toastr.error('Designation is required.');
      }

      // Supervisor
      else if (addEmployeeForm.get('supervisor')?.errors?.['required']) {
        this.toastr.error('Supervisor is required.');
      }

      // Employee ID
      else if (addEmployeeForm.get('employeeId')?.errors?.['required']) {
        this.toastr.error('Employee ID is required.');
      }

      // Role
      else if (addEmployeeForm.get('role')?.errors?.['required']) {
        this.toastr.error('Role is required.');
      }

      // Work Shift
      else if (addEmployeeForm.get('workShift')?.errors?.['required']) {
        this.toastr.error('Work Shift is required.');
      }

      // Work Type
      else if (addEmployeeForm.get('workType')?.errors?.['required']) {
        this.toastr.error('Work Type is required.');
      }
    }
  }

  getSelectedName(list: any, id: any): string {
    const selectedItem = list.find(item => item.id === id);
    return selectedItem ? selectedItem.name : '';
  }

  isNumberKey(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  // to bind dropdown to empType name
  empTypeOptions: any[] = [];

  loadEmpTypeOptions() {
    this.employeeApiService.getempTypeOptions().subscribe(options => {
      this.empTypeOptions = options;
    });
  }
  //#region Added by sapna on 5 July 2024 for supervisor ddl bind
  supervisorOptions: any[] = [];

  loadSupervisorOptions() {
    this.employeeApiService.getAllSupervisor().subscribe(options => {
      this.supervisorOptions = options;
 });
 }
 //#endregion


}

//#endregion