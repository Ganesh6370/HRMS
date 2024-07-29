 

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '../service/master.service';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { holidaytypetList } from 'src/app/shared/models/master';

@Component({
  selector: 'app-holi-day',
  templateUrl: './holi-day.component.html',
  styleUrls: ['./holi-day.component.scss']
})
export class HoliDayComponent implements AfterViewInit{

  createdOn: string = '';
  validationForm!: FormGroup;
  holidayTypeId!: string;
  holidayTypeName: string = '';
  holidaytypetList: holidaytypetList[] = [];
  displayedColumns: string[] = ['select','holidayTypeId', 'holidayTypeName', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<holidaytypetList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private holidayService: MasterService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<holidaytypetList>();
    this.validationForm = new FormGroup({
      deptName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });
  }
  get deptName(): AbstractControl {
    return this.validationForm.get('deptName')!;
  }

  onSubmit(form: FormGroup): void {
    this.validationForm.markAllAsTouched();
    if (form.valid) {
      this.saveholidaydata();
    }
    else {
      this.toastr.error("Please filled Details")
    }
  }
  
  saveholidaydata() {
    const currentDate = new Date().toISOString();
    const holidayDetails = {
      holidayTypeName: this.holidayTypeName.trim(),
      createdBy: "Ganesh",
      isActive: true,
      createdOn: currentDate
    };
    this.holidayService.saveHolidayDetail(holidayDetails).subscribe(
      () => {
        this.getHoliDayList();
        this.toastr.success("HoliDay save successfully");
        this.showTabs = false;
        this.holidayTypeName = '';
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          this.toastr.error("Duplicate HoliDay data. Please enter unique data.");
        } else {
          this.toastr.error("Something went wrong while saving the HoliDay details");
        }
      }
    );
  }
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    this.holidayTypeName = '';
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
    obj = this.holidaytypetList.find((ele) => { return ele.holidayTypeId == parseInt(deptId) });
    this.holidayTypeName = obj.holidayTypeName.trim();
    this.holidayTypeId = obj.holidayTypeId;
    this.createdOn = obj.createdOn;
  }
  preventCloses(event: MouseEvent) {
    event.stopPropagation();
  }
  closeFunction() {
    this.showEdits = !this.showEdits;
    this.validationForm.reset();
  }
  editholidaydata(): void {
    const currentDate = new Date().toISOString();
    const holidayDetails = {
      holidayTypeName: this.holidayTypeName,
      createdBy: "Ganesh",
      updatedBy: "Ganesh",
      isActive: true,
      updatedOn: currentDate,
      createdOn: this.createdOn
    };
    this.holidayService.editHolidayDetail(holidayDetails, this.holidayTypeId).subscribe(
      () => {
        this.getHoliDayList();
        this.toastr.success("HoliDay Updated");
        this.showEdits = false;
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          this.toastr.error("Duplicate HoliDay data. Please enter unique data.");
        } else {
          this.toastr.error("Something went wrong while saving the HoliDay details");
        }
      }
    );
  }

  /////////////////////////////////////////////////////////////////

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getHoliDayList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getHoliDayList() {
    this.holidayService.getHolidayWithId().subscribe(res => {
      this.holidaytypetList = res;
      this.dataSource.data = this.holidaytypetList;
    });
  }
  

///////For Check_Box////////////
  selection = new SelectionModel<holidaytypetList>(true, []);

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

  checkboxLabel(row?: holidaytypetList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.holidayTypeId+1}`;
 }
}