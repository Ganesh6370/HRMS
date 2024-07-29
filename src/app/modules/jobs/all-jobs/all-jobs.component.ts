 
 
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  number : number;
  job_title: string;
  department: string;
  start_date: string;
  expire_date: string;
  job_type: string;
  status:string;
  applicants: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '8 Candidates',actions:''},
  {number: 2, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},
  {number: 3, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '5 Candidates',actions:''},
  {number: 4, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '3 Candidates',actions:''},
  {number: 5, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '2 Candidates',actions:''},
  {number: 6, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},
  {number: 7, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: ' 5 Candidates',actions:''},
  {number: 8, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},
  {number: 1, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '8 Candidates',actions:''},
  {number: 2, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},
  {number: 3, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '5 Candidates',actions:''},
  {number: 4, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '3 Candidates',actions:''},
  {number: 5, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '2 Candidates',actions:''},
  {number: 6, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},
  {number: 7, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: ' 5 Candidates',actions:''},
  {number: 8, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},
  {number: 1, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '8 Candidates',actions:''},
  {number: 2, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},
  {number: 3, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '5 Candidates',actions:''},
  {number: 4, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '3 Candidates',actions:''},
  {number: 5, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '2 Candidates',actions:''},
  {number: 6, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},
  {number: 7, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: ' 5 Candidates',actions:''},
  {number: 8, job_title: 'web developer',department: 'Development',start_date: '3 Mar 2019',expire_date: '31 May 2019',job_type: '',status: '',applicants: '4 Candidates',actions:''},

];

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent {
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }
  displayedColumns: string[] = ['select','number', 'job_title', 'department','start_date','expire_date','job_type','status','applicants','actions'];
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
