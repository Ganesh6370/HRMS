import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';
import { workshiftList } from 'src/app/shared/models/master';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-work-shift',
  templateUrl: './work-shift.component.html',
  styleUrls: ['./work-shift.component.scss']
})
export class WorkShiftComponent {
  createdOn: string = '';
  validationForm!: FormGroup;
  workShiftId!: string;
  workShiftName: string = '';
  workFrom: string = '';
  workTo: string = '';
  totalHours: string = '';
  workshiftList: workshiftList[] = [];
  displayedColumns: string[] = ['select','workShiftId', 'workShiftName', 'workFrom', 'workTo', 'totalHours', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<workshiftList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private WorkShiftService: MasterService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<workshiftList>();
  //   this.validationForm = new FormGroup({
  //     shiftName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
  //     shiftfrom: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
  //     shiftto: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),

  //   });
  }
  // get shiftName(): AbstractControl {
  //   return this.validationForm.get('shiftName')!;
  // }
  // get shiftfrom(): AbstractControl {
  //   return this.validationForm.get('shiftfrom')!;
  // }
  // get shiftto(): AbstractControl {
  //   return this.validationForm.get('shiftto')!;
  // }

  // onSubmit(form: FormGroup): void {
  //   this.validationForm.markAllAsTouched();
  //   if (form.valid) {
  //     this.saveworkshiftdata();
  //   }
  //   else {
  //     this.toastr.error("Please filled Details")
  //   }
  // }
  onSubmit(): void {
    if (!this.workShiftName || !this.workFrom || !this.workTo) {
      this.toastr.error("Please filled Details");
      return;
    }

    this.saveworkshiftdata();
  }
  saveworkshiftdata() {
    const currentDate = new Date().toISOString();
    const workshiftDetails = {
      workShiftName: this.workShiftName,
      workFrom: this.workFrom,
      workTo: this.workTo,
      totalHours: this.totalHours,
      createdBy: "Ganesh",
      isActive: true,
      createdOn: currentDate
    };
    console.log("workshiftDetails:", workshiftDetails);

    this.WorkShiftService.saveWorkShiftDetail(workshiftDetails).subscribe(
      () => {
        this.getWorkShiftList();
        this.toastr.success("WorkShift save successfully");
        this.showTabs = false;
        this.workShiftName = '';
        this.workFrom = '';
        this.workTo = '';
        this.totalHours = '';
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          this.toastr.error("Duplicate WorkShift data. Please enter unique data.");
        } else {
          this.toastr.error("Something went wrong while saving the WorkShift details");
        }
      }
    );
  }
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    this.workShiftName = '';
    this.workShiftName = '';
    this.workFrom = '';
    this.workTo = '';
    this.totalHours = '';
    this.validationForm.reset();
  }
  closeFunction() {
    this.showEdits = !this.showEdits;
    this.workShiftName = '';
    this.workFrom = '';
    this.workTo = '';
    this.totalHours = '';
    this.validationForm.reset();
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  /////////////*Edit Popup*//////////////

  showEdits: boolean = false;
  toggleEdit(deptId: any) {
    this.showEdits = !this.showEdits;
    let obj: any = {}
    obj = this.workshiftList.find((ele) => { return ele.workShiftId == parseInt(deptId) });
    this.workShiftName = obj.workShiftName.trim();
    this.workFrom = obj.workFrom;
    this.workTo = obj.workTo;
    this.totalHours = obj.totalHours;
    this.workShiftId = obj.workShiftId;
    this.createdOn = obj.createdOn;
  }
  preventCloses(event: MouseEvent) {
    event.stopPropagation();
  }
 
  editworkshiftdata(): void {
    const currentDate = new Date().toISOString();
    const workshiftDetails = {
      workShiftName: this.workShiftName,
      workFrom: this.workFrom,
      workTo: this.workTo,
      totalHours: this.totalHours,
      createdBy: "Ganesh",
      updatedBy: "Ganesh",
      isActive: true,
      updatedOn: currentDate,
      createdOn: this.createdOn
    };
    this.WorkShiftService.editWorkShiftDetail(workshiftDetails, this.workShiftId).subscribe(
      () => {
        this.getWorkShiftList();
        this.toastr.success("WorkShift Updated");
        this.showEdits = false;
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          this.toastr.error("Duplicate WorkShift data. Please enter unique data.");
        } else {
          this.toastr.error("Something went wrong while saving the WorkShift details");
        }
      }
    );
  }

  /////////////////////////////////////////////////////////////////

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getWorkShiftList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getWorkShiftList() {
    this.WorkShiftService.getWorkShiftWithId().subscribe(res => {
      this.workshiftList = res;
      this.dataSource.data = this.workshiftList;
    });
  }

  calculateHours() {
    throw new Error('Method not implemented.');
  }


  hours: any;


  addworkshift() {
    this.showTabs = false;
  }

  departmrntForm!: FormGroup
  workShift: string = '';
  startTime: string = '';
  endTime: string = '';
  hoursPerDay: string = '';


  calculateHoursPerDay(): void {
    if (this.workFrom && this.workTo) {
      const startParts = this.workFrom.split(':');
      const endParts = this.workTo.split(':');
  
      let startHours = parseInt(startParts[0], 10);
      const startMinutes = parseInt(startParts[1], 10);
      let endHours = parseInt(endParts[0], 10);
      const endMinutes = parseInt(endParts[1], 10);
  
      // Convert to 24-hour format
      if (this.workFrom.includes('PM') && startHours !== 12) {
        startHours += 12;
      }
      if (this.workTo.includes('PM') && endHours !== 12) {
        endHours += 12;
      }
  
      // Adjust for overnight shifts
      if (endHours < startHours || (endHours === startHours && endMinutes < startMinutes)) {
        endHours += 24;
      }
  
      // Calculate total minutes
      let totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  
      // Convert to hours and minutes
      const hours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;
  
      // Format the result
      this.totalHours = `${hours}h ${remainingMinutes}m`;
    } else {
      this.totalHours = '';
    }
  }

///////For Check_Box////////////
selection = new SelectionModel<workshiftList>(true, []);

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

checkboxLabel(row?: workshiftList): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.workShiftId+1}`;
}
}