 


import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
import {MatMenuTrigger} from '@angular/material/menu';
import {SelectionModel} from '@angular/cdk/collections';


export interface UserData {
  id: number;
  image?: string; // Optional image property
  name: string;
  jobTitle: string;
  jobType: string;
  pay: number;
  annualIP: number;
  longTermIP: number;
  status: 'Requested' | 'Approved' | 'Rejected';
}

const DATA: UserData[] = [
  { id: 1,image:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobTitle: 'Software Engineer', jobType: 'Full-time', pay: 100000, annualIP: 5000, longTermIP: 10000, status: 'Requested' },
  { id: 2,image:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Jane Smith', jobTitle: 'Product Manager', jobType: 'Part-time', pay: 80000, annualIP: 4000, longTermIP: 8000, status: 'Approved' },
  
  { id: 3,image:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobTitle: 'Software Engineer', jobType: 'Full-time', pay: 100000, annualIP: 5000, longTermIP: 10000, status: 'Requested' },
  { id: 4,image:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Jane Smith', jobTitle: 'Product Manager', jobType: 'Part-time', pay: 80000, annualIP: 4000, longTermIP: 8000, status: 'Approved' },
  { id: 1,image:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobTitle: 'Software Engineer', jobType: 'Full-time', pay: 100000, annualIP: 5000, longTermIP: 10000, status: 'Requested' },
  { id: 2,image:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Jane Smith', jobTitle: 'Product Manager', jobType: 'Part-time', pay: 80000, annualIP: 4000, longTermIP: 8000, status: 'Approved' },
  
  { id: 3,image:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobTitle: 'Software Engineer', jobType: 'Full-time', pay: 100000, annualIP: 5000, longTermIP: 10000, status: 'Requested' },
  { id: 4,image:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Jane Smith', jobTitle: 'Product Manager', jobType: 'Part-time', pay: 80000, annualIP: 4000, longTermIP: 8000, status: 'Approved' },
  { id: 1,image:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobTitle: 'Software Engineer', jobType: 'Full-time', pay: 100000, annualIP: 5000, longTermIP: 10000, status: 'Requested' },
  { id: 2,image:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Jane Smith', jobTitle: 'Product Manager', jobType: 'Part-time', pay: 80000, annualIP: 4000, longTermIP: 8000, status: 'Approved' },
  
  { id: 3,image:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobTitle: 'Software Engineer', jobType: 'Full-time', pay: 100000, annualIP: 5000, longTermIP: 10000, status: 'Requested' },
  { id: 4,image:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Jane Smith', jobTitle: 'Product Manager', jobType: 'Part-time', pay: 80000, annualIP: 4000, longTermIP: 8000, status: 'Approved' },
  { id: 1,image:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobTitle: 'Software Engineer', jobType: 'Full-time', pay: 100000, annualIP: 5000, longTermIP: 10000, status: 'Requested' },
  { id: 2,image:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Jane Smith', jobTitle: 'Product Manager', jobType: 'Part-time', pay: 80000, annualIP: 4000, longTermIP: 8000, status: 'Approved' },
  
  { id: 3,image:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobTitle: 'Software Engineer', jobType: 'Full-time', pay: 100000, annualIP: 5000, longTermIP: 10000, status: 'Requested' },
  { id: 4,image:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Jane Smith', jobTitle: 'Product Manager', jobType: 'Part-time', pay: 80000, annualIP: 4000, longTermIP: 8000, status: 'Approved' },
  
  
  
  // Add more demo data as needed
];


@Component({
  selector: 'app-offer-approvals',
  templateUrl: './offer-approvals.component.html',
  styleUrls: ['./offer-approvals.component.scss']
})
export class OfferApprovalsComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'id','image', 'name', 'jobTitle', 'jobType', 'pay', 'annualIP', 'longTermIP', 'status','action'];

 
  dataSource = new MatTableDataSource<UserData>(DATA);

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
  
   getStatusClass(status: string): string {
     switch (status) {
       case 'Requested':
         return 'bg-primary ';
       case 'Approved':
         return 'bg-success';
      case 'Rejected':
         return 'bg-danger';
       default:
         return '';
   }

   
 }
 showTabs: boolean = false;
 toggleTabs() {
   this.showTabs = !this.showTabs;
 }
 preventClose(event: MouseEvent) {
   event.stopPropagation();
}

}