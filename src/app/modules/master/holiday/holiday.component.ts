import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from '../service/master.service';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { holidaytList } from 'src/app/shared/models/master';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements AfterViewInit{

  createdOn: string = '';
  validationForm!: FormGroup;
  holidayId!: string;
  holidayName: string = '';
  holidaytList: holidaytList[] = [];
  displayedColumns: string[] = ['select','holidayId', 'holidayName', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<holidaytList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private holidayService: MasterService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<holidaytList>();
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
      holidayName: this.holidayName.trim(),
      createdBy: "Ganesh",
      isActive: true,
      createdOn: currentDate
    };
    this.holidayService.saveHolidayDetail(holidayDetails).subscribe(
      () => {
        this.getHoliDayList();
        this.toastr.success("HoliDay save successfully");
        this.showTabs = false;
        this.holidayName = '';
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
    this.holidayName = '';
    this.validationForm.reset();
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  /////////////**********Edit Popup********//////////////

  showEdits: boolean = false;
  toggleEdit(deptId: any) {
    this.showEdits = !this.showEdits;
    let obj: any = {}
    obj = this.holidaytList.find((ele) => { return ele.holidayId == parseInt(deptId) });
    this.holidayName = obj.holidayName.trim();
    this.holidayId = obj.holidayId;
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
      holidayName: this.holidayName,
      createdBy: "Ganesh",
      updatedBy: "Ganesh",
      isActive: true,
      updatedOn: currentDate,
      createdOn: this.createdOn
    };
    this.holidayService.editHolidayDetail(holidayDetails, this.holidayId).subscribe(
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
      this.holidaytList = res;
      this.dataSource.data = this.holidaytList;
    });
  }
  

///////For Check_Box////////////
  selection = new SelectionModel<holidaytList>(true, []);

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

  checkboxLabel(row?: holidaytList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.holidayId+1}`;
 }
}