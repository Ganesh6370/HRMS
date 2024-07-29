 
import { Component, AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatSelectModule } from '@angular/material/select';


export interface ListElement {
  id: number;
  name: string;
  jobtitle: string;
  department: string;
  status: string;
}

const LIST_DATA: ListElement[] = [
  { id: 1, name: 'John Doe', jobtitle:'Web Developer', department: 'Development',status:' Offered' },
  { id: 2, name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',status:' Offered'},
  { id: 4, name: 'John Doe', jobtitle:'Web Developer', department: 'Development',status:'Offered ' },
  { id: 5, name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',status:' Offered'},
  { id: 6, name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',status:' Offered'},
  { id: 7, name: 'John Doe', jobtitle:'Web Developer', department: 'Development',status:' Offered' },
  { id: 8, name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',status:'Offered '},
  { id: 9, name: 'John Smith', jobtitle: 'Android Developer', department: 'Android',status:'Offered'},
  { id: 10, name: 'John Doe', jobtitle:'Web Developer', department: 'Development',status:' Offered' },
  { id: 11,name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',status:' Offered'},
  { id: 12, name: 'John Smith', jobtitle: 'Android Developer', department: 'Android', status:' Offered'},
  { id: 13,name: 'John Doe', jobtitle:'Web Developer', department: 'Development',status:' Offered' },
  { id: 14,name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',status:' Offered'},
  { id: 15,name: 'John Smith', jobtitle: 'Android Developer', department: 'Android', status:'Offered '},
  { id: 16,name: 'John Smith', jobtitle: 'Android Developer', department: 'Android', status:' Offered'},
  { id: 17, name: 'John Doe', jobtitle:'Web Developer', department: 'Development',status:'Offered ' },
  { id: 18,name: 'Richard Miles', jobtitle: 'Web Designer', department: 'Designing',status:'Offered '},
  { id: 19, name: 'John Smith', jobtitle: 'Android Developer', department: 'Android', status:'Offered '},
  { id: 20, name: 'John Smith', jobtitle: 'Android Developer', department: 'Android', status:'Offered '},
];

@Component({
  selector: 'app-shortlist-candidates',
  templateUrl: './shortlist-candidates.component.html',
  styleUrls: ['./shortlist-candidates.component.scss']
})


export class ShortlistCandidatesComponent implements AfterViewInit{
  displayedColumns: string[] = ['select','id', 'name', 'jobtitle', 'department','status'];
  dataSource = new MatTableDataSource<ListElement>(LIST_DATA);
  selection = new SelectionModel<ListElement>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
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


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ListElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id+1}`;
 }

}