import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceService } from '../attendance-service/attendance.service';
import { ToastrService } from 'ngx-toastr';
import { manualattendList } from 'src/app/shared/models/attendance';

@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.scss']
})
export class ApproveRejectComponent implements AfterViewInit {
  manualattendList: manualattendList[] = [];
  displayedColumns: string[] = ['select', 'empRegId', 'empRegName', 'supervisor','entryDate', 'inTime', 'outTime', 'totalTime', 'statusName','action'];
  dataSource = new MatTableDataSource<manualattendList>(); 

  selection = new SelectionModel<manualattendList>(true, []); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  // input: any;

  constructor(private attendanceService: AttendanceService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<manualattendList>(); 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAttendanceList();
  }

  getEmpRegId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload['EmpRegId']||null;

    }
    return null;
  }
  getAttendanceList() {
    const empRegId = this.getEmpRegId();
    if (!empRegId) {
      console.error('User ID not found.');
      return;
    }
    this.attendanceService.getAttendanceSupervisorListWithId(empRegId).subscribe(
      (res) => {
        this.manualattendList = res;
        this.dataSource.data = this.manualattendList;
      },
      (error) => {
        console.error('Error fetching attendance data:', error);
        this.toastr.error('Failed to fetch attendance data.');
      }
    );
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

checkboxLabel(row?: manualattendList): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.empRegId+1}`;
}

}