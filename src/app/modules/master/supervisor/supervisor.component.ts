 
 

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { MasterService } from '../service/master.service';
import { SupervisorList, departmentList, designationList } from 'src/app/shared/models/master';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements AfterViewInit {
  validationForm!: FormGroup;
  designationName!: string;
  SupervisorList: SupervisorList[] = [];
  departmentList: Array<any> = [];
  designationList: Array<any> = [];
  updateForm!: FormGroup;

  displayedColumns: string[] = ['select', 'superVisorId', 'departmentId', 'desginationId', 'superVisorName', 'empRegId', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<SupervisorList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  submitted: any;
  registration: any;

  constructor(private masterService: MasterService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<SupervisorList>();
    this.validationForm = new FormGroup({
      superVisorName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      departmentId: new FormControl(null, Validators.required),
      desginationId: new FormControl(null, Validators.required),
    });
  }

  get superVisorName(): AbstractControl {
    return this.validationForm.get('superVisorName')!;
  }
  get departmentId(): AbstractControl {
    return this.validationForm.get('departmentId')!;
  }
  get desginationId(): AbstractControl {
    return this.validationForm.get('desginationId')!;
  }


  // FUNCTION TO FILTER DESIGNATIONS
  filterDesig(desig: any, deptId: any) {
    return desig.deptId == deptId
  }
  dtTrigger: Subject<any> = new Subject<any>();

  deptInputVal: String | null = null;
  // FUNCTION TO GET DEPT ID WHEN DEPARTMENT IS SELECTED
  handleDeptInput(event: any) {
    const deptId = event.target.value;
    this.deptInputVal = deptId
    this.getDesignationList(deptId)
  }
  //Department Dropdown/

  getDepartmentList() {
    this.masterService.getDepartments('Department')
      .subscribe(res => {
        this.departmentList = res.map((department: any) => ({
          id: department.deptId,
          name: department.departmentName
        }));
        this.dtTrigger.next(null);
      });
  }

  getDesignationList(deptId: any) {
    this.masterService.getAllDesig('Designation')
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
  getSupVisorList() {
    this.masterService.getSupVisorWithId().subscribe(res => {
      this.SupervisorList = res;
      this.dataSource.data = this.SupervisorList;
    });
  }
  EmployeeOptions: any[] = [];
  loadEmployeeOptions() {
    this.masterService.getEmployeeOptions().subscribe(options => {
      this.EmployeeOptions = options;
    });
  }
  onSubmit(validationForm: FormGroup) { 
    validationForm.markAllAsTouched()
    if (validationForm.valid) {
      const currentDate = new Date().toISOString();
      let formObj = {
        isActive: true,
        createdOn: currentDate,
        createdBy: "",
        updatedBy: "",
        updatedOn: currentDate,
        superVisorId: 0,
        empRegId: 0,
        superVisorName: validationForm.value.superVisorName,
        departmentId: validationForm.value.departmentId,
        desginationId: validationForm.value.desginationId,
      }
      this.masterService.saveSupVisorDetail(formObj).subscribe(
        () => {
          this.getSupVisorList();
          this.toastr.success("Supervisor saved successfully");
          this.showTabs = false;
          this.validationForm.reset();
        },
        (error) => {
          if (error.status === 500) {
            this.toastr.error("Duplicate Supervisor data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the Supervisor details");
          }
        }
      );
    }
    else {
      this.toastr.error("Please fill all values");
    }
  }

  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    this.validationForm.reset();
  }
  closeFunction() {
    this.showEdits = false;

    this.validationForm.reset();
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  /////////////*Edit Popup///////////
  showEdits: boolean = false;

  toggleEdit(deptId: any) {
    this.showEdits = !this.showEdits;
    if (this.showEdits) {
      const obj = this.SupervisorList.find((ele) => ele.superVisorId === parseInt(deptId, 10));
      this.initializeForm(obj);
    }
  }
  initializeForm(obj: any): void {
    if (obj) {
      this.updateForm.setValue({
        superVisorName: obj.superVisorName,
        departmentId: obj.departmentId,
        desginationId: obj.desginationId,
        superVisorId: obj.superVisorId,
        empRegId: obj.empRegId,
      });
    }
  }
  onSubmitEdit() { 
    if (this.updateForm.valid) {
      const currentDate = new Date().toISOString();
      const originalSupervisor = this.SupervisorList.find(supervisor => supervisor.superVisorId === this.updateForm.get('superVisorId')?.value);
      if (!originalSupervisor) {
        console.error("Original Supervisor not found.");
        return;
      }

      const supervisorDetails = {
        superVisorName: this.updateForm.get('superVisorName')?.value,
        departmentId: this.updateForm.get('departmentId')?.value,
        desginationId: this.updateForm.get('desginationId')?.value,
        superVisorId: this.updateForm.get('superVisorId')?.value,
        empRegId: this.updateForm.get('empRegId')?.value,
        isActive: true,
        updatedOn: currentDate,
        updatedBy: "",
        createdOn: originalSupervisor.createdOn,
        createdBy: originalSupervisor.createdBy,
      };
      this.masterService.editSupVisorDetail(supervisorDetails, this.updateForm.get('superVisorId')?.value)
        .subscribe(
          () => {
            this.getSupVisorList();
            this.toastr.success("Supervisor data Updated");
            this.showEdits = false;
          },
          (error) => {
            // console.error(error);
            if (error.status === 500) {
              this.toastr.error("Duplicate Supervisor data. Please enter unique data.");
            } else {
              this.toastr.error("Something went wrong while saving the Supervisor details");
            }
          }
        );
    }
  }

  /////////////////////////////////////////////////////////
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getDepartmentList();
    this.getSupVisorList();
    this.loadEmployeeOptions();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ///////For Check_Box////////////
  selection = new SelectionModel<SupervisorList>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: SupervisorList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.superVisorId+1}`;
 }

}