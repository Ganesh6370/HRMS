 

import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common'; 

export interface ListElement {
  id: number;
  name: string;
  jobtitle: string;
  department: string;
  categorywisemark: string;
  totalmark: number;
  status: string;
  profile:string;
}

const LIST_DATA: ListElement[] = [
  { id: 1, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobtitle:'Web Developer', department: 'Development',categorywisemark:'html-1 level1-0',totalmark:1,status:'Action pending' },
  { id: 2, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',categorywisemark:'html-1 level1-0', totalmark:1,status:'Action pending'},
  { id: 3, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',categorywisemark:'html-1 level1-0',totalmark:1, status:'Action pending'},
  { id: 4, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobtitle:'Web Developer', department: 'Development',categorywisemark:'html-1 level1-0',totalmark:1,status:'Action pending' },
  { id: 5, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',categorywisemark:'html-1 level1-0', totalmark:1,status:'Action pending'},
  { id: 6, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',categorywisemark:'html-1 level1-0',totalmark:1, status:'Action pending'},
  { id: 7, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobtitle:'Web Developer', department: 'Development',categorywisemark:'html-1 level1-0',totalmark:1,status:'Action pending' },
  { id: 8, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',categorywisemark:'html-1 level1-0', totalmark:1,status:'Action pending'},
  { id: 9, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',categorywisemark:'html-1 level1-0',totalmark:1, status:'Action pending'},
  { id: 10, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobtitle:'Web Developer', department: 'Development',categorywisemark:'html-1 level1-0',totalmark:1,status:'Action pending' },
  { id: 11, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',categorywisemark:'html-1 level1-0', totalmark:1,status:'Action pending'},
  { id: 12, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',categorywisemark:'html-1 level1-0',totalmark:1, status:'Action pending'},
  { id: 13, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'John Doe', jobtitle:'Web Developer', department: 'Development',categorywisemark:'html-1 level1-0',totalmark:1,status:'Action pending' },
  { id: 14, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',categorywisemark:'html-1 level1-0', totalmark:1,status:'Action pending'},
  { id: 15, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',categorywisemark:'html-1 level1-0',totalmark:1, status:'Action pending'},
  { id: 16, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',categorywisemark:'html-1 level1-0',totalmark:1, status:'Action pending'},
  { id: 17,profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Doe', jobtitle:'Web Developer', department: 'Development',categorywisemark:'html-1 level1-0',totalmark:1,status:'Action pending' },
  { id: 18, profile:'https://mdbootstrap.com/img/new/avatars/8.jpg',name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',categorywisemark:'html-1 level1-0', totalmark:1,status:'Action pending'},
  { id: 19,profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',categorywisemark:'html-1 level1-0',totalmark:1, status:'Action pending'},
  { id: 20,profile:'https://mdbootstrap.com/img/new/avatars/8.jpg', name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',categorywisemark:'html-1 level1-0',totalmark:1, status:'Action pending'},
];

@Component({
  selector: 'app-aptitude-result',
  templateUrl: './aptitude-result.component.html',
  styleUrls: ['./aptitude-result.component.scss']
})


export class AptitudeResultComponent implements AfterViewInit {

  displayedColumns: string[] = ['select','id','profile', 'name', 'jobtitle', 'department','categorywisemark','totalmark','status'];
  dataSource = new MatTableDataSource<ListElement>(LIST_DATA);
  selection = new SelectionModel<ListElement>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkboxLabel(row?: ListElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id+1}`;
 }

}