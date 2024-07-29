
import { ChangeDetectorRef, Component, ViewChild,OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { manualattendList } from 'src/app/shared/models/attendance';
import { AttendanceService } from '../attendance-service/attendance.service';

@Component({
  selector: 'app-manual-attendance',
  templateUrl: './manual-attendance.component.html',
  styleUrls: ['./manual-attendance.component.scss']
})
export class ManualAttendanceComponent {

  createdOn: string = '';
  validationForm!: FormGroup;
  manualAttendanceId!: string;
  type: string = '';
  date: string = '';
  time: string = "";
  remarks: string = '';
  manualattendList: manualattendList[] = [];
  displayedColumns: string[] = ['manualAttendanceId', 'type', 'date', 'time', 'remarks', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn','statusName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<manualattendList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private manualAttendance: AttendanceService, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<manualattendList>();
    this.validationForm = new FormGroup({
      atteType: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      atteDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      atteTime: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      atteDesc: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });
  }
  today: string | undefined;
  twoWeeksAgo: string | undefined;

  ngOnInit() {
    const todayDate = new Date();
    const twoWeeksAgoDate = new Date(todayDate);
    twoWeeksAgoDate.setDate(todayDate.getDate() - 14); // Subtract 14 days to get the date two weeks ago

    this.today = todayDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    this.twoWeeksAgo = twoWeeksAgoDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
 }
  get atteType(): AbstractControl {
    return this.validationForm.get('atteType')!;
  }
  get atteDate(): AbstractControl {
    return this.validationForm.get('atteDate')!;
  }
  get atteTime(): AbstractControl {
    return this.validationForm.get('atteTime')!;
  }
  get atteDesc(): AbstractControl {
    return this.validationForm.get('atteDesc')!;
  }

  onSubmit(form: FormGroup): void {
    this.validationForm.markAllAsTouched();
    if (form.valid) {
      if (this.type === 'Punch Out' && !this.isPunchInExistsForDate(this.date)) {
        this.toastr.error("Cannot select Punch Out without a corresponding Punch In for the selected date.");
        return;
      }
      this.saveManualAttendancedata();
    } else {
      this.toastr.error("Please fill in all required details.");
    }
  }

  isPunchInExistsForDate(date: string): boolean {
    return this.manualattendList.some(entry => entry.type === 'Punch In' && this.formatDate(entry.date)===date);
 }
  saveManualAttendancedata() {
    const currentDate = new Date().toISOString();
    const ManulAttendDetails = {
      loginDate: "",
      inTime: "",
      outTime: "",
      totalTime: "",
      type: this.type,
      date: this.date,
      time: this.time,
      remarks: this.remarks,
      isActive: true,
      statusId:1,
      statusName: "Pending",
      createdOn: currentDate,
      empRegName:"",
      entryDate:"",
      supervisor:"",
      updatedOn: currentDate,
     updatedBy:"",
    };
    this.manualAttendance.saveManualAttendanceDetail(ManulAttendDetails).subscribe(
      () => {
        this.getManualAttendanceList();
        this.toastr.success("ManualAttendance save successfully");
        this.showTabs = false;
        this.type = '';
        this.date = '';
        this.time = '';
        this.remarks = '';
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          this.toastr.error("Duplicate ManualAttendance data. Please enter unique data.");
        } else {
          this.toastr.error("Something went wrong while saving the ManualAttendance details");
        }
      }
    );
  }
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    this.validationForm.reset(); //added by Aman on 17-07-2024
    this.type = '';
    this.date = '';
    this.time = '';
    this.remarks = '';
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  /////////////Edit Popup//////////////

  showEdits: boolean = false;
  toggleEdit(deptId: any) {
    this.showEdits = !this.showEdits;
    let obj: any = {}
    obj = this.manualattendList.find((ele) => { return ele.manualAttendanceId == parseInt(deptId) });
    if (obj) {
      this.type = obj.type;
  
      if (obj.date) {
        const dateObject = new Date(obj.date);
        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        this.date = `${year}-${month}-${day}`;
      } else {
        this.date = '';
      }
  // Check the date value here
  console.log('Formatted Date:', this.date);
      this.time = obj.time;
      this.remarks = obj.remarks;
      this.manualAttendanceId = obj.manualAttendanceId;
      this.createdOn = obj.createdOn;
      this.cdr.detectChanges();
    }   

  }
  preventCloses(event: MouseEvent) {
    event.stopPropagation();
  }
  closeFunction() {
    this.showEdits = !this.showEdits;
    this.type = '';
    this.date = '';
    this.time = '';
    this.remarks = '';
  }
  editManualAttendancedata(): void {
    const currentDate = new Date().toISOString();
    const ManulAttendDetails = {
      loginDate: "",
      inTime: "",
      outTime: "",
      totalTime: "",
      type: this.type,
      date: this.date,
      time: this.time,
      remarks: this.remarks,  
      statusName: "",
      isActive: true,
      updatedOn: currentDate,
      createdOn: this.createdOn,
      empRegName:"",
      entryDate:"",
      supervisor:"", 
      updatedBy:"",
    };
    this.manualAttendance.editManualAttendanceDetail(ManulAttendDetails, this.manualAttendanceId).subscribe(
      () => {
        this.getManualAttendanceList();
        this.toastr.success("ManualAttendance Updated");
        this.showEdits = false;
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          this.toastr.error("Duplicate ManualAttendance data. Please enter unique data.");
        } else {
          this.toastr.error("Something went wrong while saving the ManualAttendance details");
        }
  }
 );
 }

  /////////////////////////////////////////////////////////////////

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getManualAttendanceList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
//   getManualAttendanceList() {
//     this.manualAttendance.getManualAttendanceWithId().subscribe(res => {
//       this.manualattendList = res;
//       this.dataSource.data = this.manualattendList;
//  });
//  }
getEmpRegId(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    
    return tokenPayload['EmpRegId']||null;
  }
  return null;
}
getManualAttendanceList() { 
  const empRegId = this.getEmpRegId() || '';
  if (!empRegId) {
    console.error('Data Not Found.');
    return;
  }

  this.manualAttendance.getManualAttendanceWithId(empRegId).subscribe(res => {
    this.manualattendList = res;
    this.dataSource.data = this.manualattendList;
 });
}
//#region added by sapna for date formate
formatDate(date: string | Date): string {
  const dateObj = (typeof date === 'string') ? new Date(date) : date;
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
  }
  //#endregion

}