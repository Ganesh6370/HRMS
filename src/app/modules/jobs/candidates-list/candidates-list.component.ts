 

import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuTrigger} from '@angular/material/menu';
import {SelectionModel} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';


export interface UserData {
  id: number;
  name: string;
  profile?: string;
  mobile: string;
  email: string;
  createdDate: Date;
}
/** Constants used to fill up our data base. */
const DATA: UserData[] =[
  {id:1, profile:'assets/img/profile.png',name:'John Doe', mobile:'9876543210', email:'johndoe@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:2, profile:'assets/img/profile.png',name:'Richard Miles', mobile:'9876543210', email:'richardmiles@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:3, profile:'assets/img/profile.png', name:'John Smith', mobile:'9876543210', email:'johnsmith@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:4, profile:'assets/img/profile.png',name:'Olivia', mobile:'9998887776', email:'example4@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:5, profile:'assets/img/profile.png', name:'Mia', mobile:'9876543210', email:'example5@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:6, profile:'assets/img/profile.png',name:'John Doe', mobile:'9876543210', email:'johndoe@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:7, profile:'assets/img/profile.png',name:'Richard Miles', mobile:'9876543210', email:'richardmiles@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:8, profile:'assets/img/profile.png',name:'John Smith', mobile:'9876543210', email:'johnsmith@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:4, profile:'assets/img/profile.png',name:'Olivia', mobile:'9998887776', email:'example4@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:5, profile:'assets/img/profile.png',name:'Mia', mobile:'9876543210', email:'example5@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:1, profile:'assets/img/profile.png',name:'John Doe', mobile:'9876543210', email:'johndoe@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:2, profile:'assets/img/profile.png',name:'Richard Miles', mobile:'9876543210', email:'richardmiles@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:3, profile:'assets/img/profile.png',name:'John Smith', mobile:'9876543210', email:'johnsmith@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:4, profile:'assets/img/profile.png',name:'Olivia', mobile:'9998887776', email:'example4@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},
  {id:5, profile:'assets/img/profile.png',name:'Mia', mobile:'9876543210', email:'example5@example.com',createdDate:randomDate(new Date(2020, 0, 1), new Date())},

]

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'profile', 'name', 'mobile', 'email', 'createdDate', 'action'];
  dataSource = new MatTableDataSource(DATA);

  selection = new SelectionModel<UserData>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;
  element: any;

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
