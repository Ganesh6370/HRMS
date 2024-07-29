 
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';

export interface UserData {
  id: number;
  name: string;
  profile: string;
  jobTitle: string;
  department: string;
  startDate: Date;
  expireDate: Date;
  jobType: string;
  status: string;
  resume: string;
}
/** Constants used to fill up our data base. */
const DATA: UserData[] = [
  { id: 1, profile: 'assets/img/profile.png', name: 'John Doe', jobTitle: 'Web Developer', department: 'Development', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'FullTime', status: 'Open', resume: 'abc' },
  { id: 2, profile: 'assets/img/profile.png', name: 'Richard Miles', jobTitle: 'Web Designer', department: 'Designing', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'Part Time', status: 'Open', resume: 'cde' },
  { id: 3, profile: 'assets/img/profile.png', name: 'John Smith', jobTitle: 'Android Developer', department: 'Android', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'Internship', status: 'Open', resume: 'efg' },
  { id: 4, profile: 'assets/img/profile.png', name: 'Olivia', jobTitle: 'Web developer', department: 'Development', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'Temporary', status: 'Cancelled', resume: 'abc' },
  { id: 5, profile: 'assets/img/profile.png', name: 'Mia', jobTitle: 'Web developer', department: 'Development', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'Other', status: 'Closed', resume: 'abc' },
  { id: 6, profile: 'assets/img/profile.png', name: 'Olivia', jobTitle: 'Web developer', department: 'Development', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'Temporary', status: 'Cancelled', resume: 'abc' },
  { id: 7, profile: 'assets/img/profile.png', name: 'Mia', jobTitle: 'Web developer', department: 'Development', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'Other', status: 'Closed', resume: 'abc' },
  { id: 6, profile: 'assets/img/profile.png', name: 'Olivia', jobTitle: 'Web developer', department: 'Development', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'Temporary', status: 'Cancelled', resume: 'abc' },
  { id: 7, profile: 'assets/img/profile.png', name: 'Mia', jobTitle: 'Web developer', department: 'Development', startDate: randomDate(new Date(2020, 0, 1), new Date()), expireDate: randomDate(new Date(2020, 0, 1), new Date()), jobType: 'Other', status: 'Closed', resume: 'abc' },

]

@Component({
  selector: 'app-manage-resumes',
  templateUrl: './manage-resumes.component.html',
  styleUrls: ['./manage-resumes.component.scss']
})
export class ManageResumesComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'profile', 'name', 'jobTitle', 'department', 'startDate', 'expireDate', 'jobType', 'status', 'resume', 'action'];
  jobTypes = ['Full Time', 'Part Time', 'Internship', 'Temporary', 'Other'];

  dataSource = new MatTableDataSource(DATA);

  selection = new SelectionModel<UserData>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // code for round button
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }
  //download resume
  downloadResume(row: UserData) {
    // Implement download logic here
    console.log('Downloading resume:', row.resume);
    // You can use a download service or window.location to download the resume
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(user: UserData) {
    // Implement edit logic here
    console.log('Editing user:', user);
    this.contextMenu.closeMenu();
  }

  deleteUser(user: UserData) {
    // Implement delete logic here
    console.log('Deleting user:', user);
    this.contextMenu.closeMenu();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}


function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}