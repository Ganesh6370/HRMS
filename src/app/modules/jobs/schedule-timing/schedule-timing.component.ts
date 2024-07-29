 

import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { SelectionModel } from '@angular/cdk/collections';  

export interface PeriodicElement {
  number : number;
  image?: string;
  emailid: string;
  name: string;
  job_title: string;
  user_Available_timings: string;
  schedule_timings: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, image:'https://mdbootstrap.com/img/new/avatars/8.jpg',  name: 'John Doe',emailid: 'john@gmail.com', job_title: 'web developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 2,image:'https://mdbootstrap.com/img/new/avatars/7.jpg',  name: 'Ray Doe',emailid: 'john@gmail.com', job_title: 'Software developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 3,image:'https://mdbootstrap.com/img/new/avatars/5.jpg',  name: 'macerick',emailid: 'john@gmail.com', job_title: 'UI developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 4, image:'https://mdbootstrap.com/img/new/avatars/8.jpg',  name: 'John Doe',emailid: 'john@gmail.com', job_title: 'web developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 5,image:'https://mdbootstrap.com/img/new/avatars/7.jpg',  name: 'Ray Doe',emailid: 'john@gmail.com', job_title: 'Software developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 6,image:'https://mdbootstrap.com/img/new/avatars/5.jpg',  name: 'macerick',emailid: 'john@gmail.com', job_title: 'UI developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 7, image:'https://mdbootstrap.com/img/new/avatars/8.jpg',  name: 'John Doe',emailid: 'john@gmail.com', job_title: 'web developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 8,image:'https://mdbootstrap.com/img/new/avatars/7.jpg',  name: 'Ray Doe',emailid: 'john@gmail.com', job_title: 'Software developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 9,image:'https://mdbootstrap.com/img/new/avatars/5.jpg',  name: 'macerick',emailid: 'john@gmail.com', job_title: 'UI developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 10, image:'https://mdbootstrap.com/img/new/avatars/8.jpg',  name: 'John Doe',emailid: 'john@gmail.com', job_title: 'web developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 11,image:'https://mdbootstrap.com/img/new/avatars/7.jpg',  name: 'Ray Doe',emailid: 'john@gmail.com', job_title: 'Software developer', user_Available_timings: 'H', schedule_timings: 'sdf'},
  {number: 12,image:'https://mdbootstrap.com/img/new/avatars/5.jpg',  name: 'macerick',emailid: 'john@gmail.com', job_title: 'UI developer', user_Available_timings: 'H', schedule_timings: 'sdf'},

];

@Component({
  selector: 'app-schedule-timing',
  templateUrl: './schedule-timing.component.html',
  styleUrls: ['./schedule-timing.component.scss']   
})
export class ScheduleTimingComponent implements AfterViewInit {
  displayedColumns: string[] = ['select','number', 'name', 'job_title', 'user_Available_timings','schedule_timings'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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

    showTabs: boolean = false;
    toggleTabs() {
      this.showTabs = !this.showTabs;
    }
    preventClose(event: MouseEvent) {
      event.stopPropagation();
    }

    


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.number + 1}`;
 }
}