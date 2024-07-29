 
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { MasterService } from '../service/master.service';
import { managerList, departmentList, designationList } from 'src/app/shared/models/master';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements AfterViewInit {
  validationForm!: FormGroup;
  designationName!: string;
  managerId!: string;
  managerName: string | null = null;
  desginationId: string | null = null;
  departmentId: string | null = null;

  // ManagerList: managerList[] = [];
  ManagerList: Array<any> = [];
  departmentList: Array<any> = [];
  designationList: Array<any> = [];
  updateForm!: FormGroup;

  displayedColumns: string[] = ['select', 'managerId', 'departmentId', 'desginationId', 'managerName', 'empRegId', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<managerList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  submitted: any;
  registration: any;

  constructor(private masterService: MasterService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<managerList>();
    this.validationForm = new FormGroup({
      managerName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      departmentId: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      desginationId: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getDepartmentList();
    this.getManagerList();
    this.getDesignationList();
    this.loadEmployeeOptions();
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
    this.getDesignationList()
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

  getDesignationList() {
    this.masterService.getAllDesig('Designation')
      .subscribe(res => {
        this.designationList = res.map((designation: any) => ({
          id: designation.desigId,
          name: designation.designationName
        }));
        this.dtTrigger.next(null);
      });
  }

  getManagerList() {
    this.masterService.getManagerWithId().subscribe(res => {
      this.ManagerList = res;
      this.dataSource.data = this.ManagerList;
    })
  }

  EmployeeOptions: any[] = [];

  loadEmployeeOptions() {
    this.masterService.getEmployeeOptions().subscribe(options => {
      this.EmployeeOptions = options;
    });
  }

  onSubmit(validationForm: FormGroup) {
    validationForm.markAllAsTouched()
    console.log(validationForm.valid);
    if (validationForm.valid) {
      const currentDate = new Date().toISOString();
      let formObj = {
        isActive: true,
        createdOn: currentDate,
        createdBy: "",
        updatedBy: "",
        remarks:"",
        // updatedOn: currentDate,
        // managerId: 0,
        empRegId: 0,
        managerName: validationForm.value.managerName,
        departmentId: validationForm.value.departmentId,
        desginationId: validationForm.value.desginationId,
      }
      console.log(formObj);
      this.masterService.saveManagerDetail(formObj).subscribe(
        () => {
          this.getManagerList();
          this.toastr.success("Manager saved successfully");
          this.showTabs = false;
          this.validationForm.reset();
        },
        (error) => {
          if (error.status === 500) {
            
            this.toastr.error("Duplicate Manager data. Please enter unique data.");
          } else {
            console.log(error);
            this.toastr.error("Something went wrong while saving the Manager details");
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

  toggleEdit(managerId: any) {
    this.showEdits = !this.showEdits;
    let obj: any = {}
    obj = this.ManagerList.find((ele) =>{return ele.managerId == parseInt(managerId)});
    this.managerName = obj.managerName.trim();
    this.managerId = obj.managerId;
    this.departmentId= obj.departmentId;
    this.desginationId=obj.desginationId;
  }
  
  initializeForm(obj: any): void {
    if (obj) {
      this.updateForm.setValue({
        managerName: obj.managerName,
        departmentId: obj.departmentId,
        desginationId: obj.desginationId,
        managerId: obj.managerId,
        empRegId: obj.empRegId,
      });
    }
  }

  onSubmitEdit():void {
      this.showTabs = false;
      const currentDate = new Date().toISOString();
        const managerDetails = {
          managerName: this.managerName,
          departmentId: this.departmentId,
          desginationId: this.desginationId,
          isActive: true,
          createdOn: currentDate,
          createdBy: "",
          updatedBy: "",
          remarks:"",
          empRegId: 0,
        };
        this.masterService.editManagerDetail(managerDetails, this.managerId)
          .subscribe(
            () => {
              this.getManagerList();
              this.toastr.success("Manager data Updated");
              this.showEdits = false;
            },
            (error) => {
              // console.error(error);
              if (error.status === 500) {
                this.toastr.error("Duplicate Manager data. Please enter unique data.");
              } else {
                this.toastr.error("Something went wrong while saving the Manager details");
              }
            }
          );
        }

  /////////////////////////////////////////////////////////
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ///////For Check_Box////////////
  selection = new SelectionModel<managerList>(true, []);

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

  checkboxLabel(row?: managerList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.managerId+1}`;
 }

}