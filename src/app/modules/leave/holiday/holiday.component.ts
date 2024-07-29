import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from "src/app/shared/service/http/http.service";
import { holidayList } from 'src/app/shared/models/leave';
import { ToastrService } from 'ngx-toastr';
import { LeaveService } from '../leave-service/leave.service';
import { ConfigurationService } from "src/app/shared/service/http/configuration.service";

@Component({
  selector: 'app-holyday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements AfterViewInit {
  holidayList: holidayList[] = [];
  displayedColumns: string[] = ['select', 'holidayId', 'holiDayType', 'holiDayName', 'fromDate', 'toDate', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'action'];
  dataSource: MatTableDataSource<holidayList>;
  isFormSubmitted: boolean = false;
  isInputFieldTouchedOrDirty: boolean = false;
  selection = new SelectionModel<holidayList>(true, []);
  updateForm!: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;
  validationForm!: FormGroup;
  type: any;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getHolidayList();
    this.loadHolidayOptions();
  }

  constructor(private leaveService: LeaveService, private toastr: ToastrService, private httpService: HttpService, private configuration: ConfigurationService) {
    this.dataSource = new MatTableDataSource<holidayList>();
    this.validationForm = new FormGroup({
      holiDayType: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      holiDayName: new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*')
        ], updateOn: 'change'
      }),
      fromDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      toDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });

  }

  get holiDayType(): AbstractControl {
    return this.validationForm.get('holiDayType')!;
  }
  get holiDayName(): AbstractControl {
    return this.validationForm.get('holiDayName')!;
  }
  get fromDate(): AbstractControl {
    return this.validationForm.get('fromDate')!;
  }
  get toDate(): AbstractControl {
    return this.validationForm.get('toDate')!;
  }

  onSubmit(validationForm: FormGroup) {
    validationForm.markAllAsTouched()
    if (validationForm.valid) {
      const currentDate = new Date().toISOString();
      let formObj = {
        "isActive": true,
        "createdOn": currentDate,
        // "createdBy": "",
        "updatedOn": currentDate,
        "holidayId": 0,
        "holiDayName": validationForm.value.holiDayName,
        "holiDayType": validationForm.value.holiDayType,
        "fromDate": validationForm.value.fromDate,
        "toDate": validationForm.value.toDate,
      }
      console.log(formObj)
      this.leaveService.saveHolidayDetail(formObj).subscribe(
        () => {
          this.getHolidayList();
          this.toastr.success("Holiday saved successfully");
          this.showTabs = false;
          this.validationForm.reset();
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate Holiday data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the Holiday details");
          }
        }
      );
    }
    else {
      this.toastr.error("Please fill all values");
    }
  }

  /////////////*Edit Popup///////////
  showEdits: boolean = false;
  closeFunction() {
    this.showEdits = !this.showEdits;
  }
  toggleEdit(deptId: any) {
    this.showEdits = !this.showEdits;
    let obj: any = {};
    obj = this.holidayList.find((ele) => ele.holidayId == parseInt(deptId));
    this.initializeForm(obj);
  }
  initializeForm(obj: any): void {
    console.log(obj); // Log obj to check its contents
    if (this.showEdits) {

      const fromDateObject = obj.fromDate ? new Date(obj.fromDate) : null;
      const toDateObject = obj.toDate ? new Date(obj.toDate) : null;

      const fromDay = fromDateObject ? fromDateObject.getDate().toString().padStart(2, '0') : '';
      const fromMonth = fromDateObject ? (fromDateObject.getMonth() + 1).toString().padStart(2, '0') : '';
      const fromYear = fromDateObject ? fromDateObject.getFullYear() : '';

      const toDay = toDateObject ? toDateObject.getDate().toString().padStart(2, '0') : '';
      const toMonth = toDateObject ? (toDateObject.getMonth() + 1).toString().padStart(2, '0') : '';
      const toYear = toDateObject ? toDateObject.getFullYear() : '';

      this.updateForm = new FormGroup({
        holidayId: new FormControl(obj.holidayId, { validators: Validators.required, updateOn: 'submit' }),
        holiDayName: new FormControl(obj.holiDayName, {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[a-zA-Z ].*') 
          ],
          updateOn: 'change'
        }),
        holiDayType: new FormControl(obj.holiDayType, { validators: Validators.required, updateOn: 'submit' }),
        fromDate: new FormControl(fromDateObject ? `${fromYear}-${fromMonth}-${fromDay}` : '', { validators: Validators.required, updateOn: 'submit' }),
        toDate: new FormControl(toDateObject ? `${toYear}-${toMonth}-${toDay}`: '', { validators: Validators.required, updateOn: 'submit' }),
      });
    }
  }
  get holidayName(): AbstractControl {
    return this.updateForm.get('holiDayName')!;
  }
  
  onSubmitEdit(updateForm: FormGroup) { 
    if (updateForm.valid) {
      const currentDate = new Date().toISOString();
      const originalHoliday = this.holidayList.find(holiday => holiday.holidayId === updateForm.get('holidayId')?.value);
      if (!originalHoliday) {
        console.error("Original holiday not found.");
        return;
      }
      const holidayDetails = {
        holidayId: updateForm.get('holidayId')?.value,
        holiDayName: updateForm.get('holiDayName')?.value,
        holiDayType: updateForm.get('holiDayType')?.value,
        fromDate: updateForm.get('fromDate')?.value,
        toDate: updateForm.get('toDate')?.value,
        isActive: true,
        createdOn: originalHoliday.createdOn,
        createdBy: originalHoliday.createdBy,
        // updatedBy:"",
        updatedOn: currentDate,
      };
      this.leaveService.editHolidayDetail(holidayDetails, updateForm.get('holidayId')?.value)
        .subscribe(
          () => {
            this.getHolidayList();
            this.toastr.success("Holiday data Updated");
            this.showEdits = false;
          },
          (error) => {
            console.error(error);
            if (error.status === 500) {
              this.toastr.error("Duplicate Holiday data. Please enter unique data.");
            } else {
              this.toastr.error("Something went wrong while saving the Holiday details");
            }
          }
        );
    }
  }

  /////////////////////////////////////////////////////////

  getHolidayList() {
    this.leaveService.getHolidayWithId().subscribe(res => {
      this.holidayList = res;
      this.dataSource.data = this.holidayList;
    })
  }
  //code for edit close
  toggleTab() {
    this.showEdits = !this.showEdits;
    if (!this.showEdits) {
      this.validationForm.reset();
      this.isInputFieldTouchedOrDirty = false; // Reset the flag for input field
    }
  }
  cancelEdit(): void {
    this.validationForm.reset(); // Reset the form
    this.showEdits = false; // Hide the modal
  }

  // code for round button
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    if (!this.showTabs) {
      this.validationForm.reset();
      this.isInputFieldTouchedOrDirty = false; // Reset the flag for input field
    }
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** CHECKBOOX */
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

  checkboxLabel(row?: holidayList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.holidayId + 1}`;
  }

  // to bind dropdown to holiday name
  holidayOptions: any[] = [];

  loadHolidayOptions() {
    this.leaveService.getHolidayOptions().subscribe(options => {
      this.holidayOptions = options;
});
}

}