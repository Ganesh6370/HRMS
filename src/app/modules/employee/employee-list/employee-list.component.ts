import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmployeeServiceService } from './../../employee/employee-service/employee-service.service';
import { employeeList } from 'src/app/shared/models/employeelist';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  position: number; // Add this line
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'fullName', 'gender', 'bloodGroup', 'dob', 'maritalStatus', 'reliegion', 'fatherorHusbandName', 'dateofMarriage', 'mobileNo', 'email'];
  dataSource: MatTableDataSource<PeriodicElement>;
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeApiService: EmployeeServiceService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   this.getProductCategoryList();
    // this.getEmployeeList();
    // this.empRegId = this.getEmpRegId(); //added by Aman for current Employee Id
  }

  getProductCategoryList() {
    this.employeeApiService.getEmpWithId().subscribe(res => {
      this.dataSource.data = res; // Assign data to dataSource
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  navigateToProfile(empId: string) {
    this.router.navigate(['../main/employee/profile'], { queryParams: { empid:empId}});
}
//#region added by Amandeep Virdhi on 18-07-2024 for current user
//get user id 
// empRegId: any
// getEmpRegId(): string | null {
//   const token = localStorage.getItem('token');
//   if (token) {
//     const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//     return tokenPayload['EmpRegId'] || null;
//   }
//   return null;
// }

// getEmployeeList() {
//   this.employeeApiService.getEmpWithId().subscribe(
//     (res) => {
//       const empRegId = this.getEmpRegId();
//       let filteredData = res;
      
//       if (empRegId) {
//         filteredData = res.filter(item => item.empPersDtlId === parseInt(empRegId));
//       }
//       this.dataSource.data = filteredData; // Assign filtered data to dataSource
//     },
//     (error) => {
//       // Handle error here
//     }
//   );
// }
//#endregion
}