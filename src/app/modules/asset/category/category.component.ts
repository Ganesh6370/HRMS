import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from '../asset-service/asset.service';
import { SelectionModel } from '@angular/cdk/collections';
import { assetcategoryList } from 'src/app/shared/models/asset';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent  implements AfterViewInit {

    createdOn: string = '';
    validationForm!: FormGroup;
    assetCategoryId!: string;
    category: string = '';
    categoryIcon: string ='';
    assetcategoryList: assetcategoryList[] = [];
    displayedColumns: string[] = ['select','assetCategoryId', 'category', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive','categoryIcon', 'actions'];
    dataSource: MatTableDataSource<assetcategoryList>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(private assetService: AssetService, private toastr: ToastrService) {
      this.dataSource = new MatTableDataSource<assetcategoryList>();
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
        this.savecategorydata();
      }
      else {
        this.toastr.error("Please filled Details")
      }
    }
    savecategorydata() {
      const currentDate = new Date().toISOString();
      const categoryDetails = {
        category: this.category.trim(),
        createdBy: "Ganesh",
        isActive: true,
        createdOn: currentDate
      };
      this.assetService.saveCategoryDetail(categoryDetails).subscribe(
        () => {
          this.getCategoryList();
          this.toastr.success("Category save successfully");
          this.showTabs = false;
          this.category = '';
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate Category data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the Category details");
          }
        }
      );
    }
    showTabs: boolean = false;
    toggleTabs() {
      this.showTabs = !this.showTabs;
      this.category = '';
      this.validationForm.reset();
    }
    closeFunction() {
      this.showEdits = !this.showEdits;
      this.category = '';
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
      obj = this.assetcategoryList.find((ele) => { return ele.assetCategoryId == parseInt(deptId) });
      this.category = obj.category.trim();
      this.assetCategoryId = obj.assetCategoryId;
      this.createdOn = obj.createdOn;
    }
    preventCloses(event: MouseEvent) {
      event.stopPropagation();
    }
 
    editcategorydata(): void {
      const currentDate = new Date().toISOString();
      const categoryDetails = {
        category: this.category,
        createdBy: "Ganesh",
        updatedBy: "Ganesh",
        isActive: true,
        updatedOn: currentDate,
        createdOn: this.createdOn
      };
      this.assetService.editCategoryDetail(categoryDetails, this.assetCategoryId).subscribe(
        () => {
          this.getCategoryList();
          this.toastr.success("Category Updated");
          this.showEdits = false;
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate Category data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the Category details");
          }
        }
      );
    }
  
    /////////////////////////////////////////////////////////////////
  
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getCategoryList();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    getCategoryList() {
      this.assetService.getCategoryWithId().subscribe(res => {
        this.assetcategoryList = res;
        this.dataSource.data = this.assetcategoryList;
      });
    }
    
  
  ///////For Check_Box////////////
    selection = new SelectionModel<assetcategoryList>(true, []);
  
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
  
    checkboxLabel(row?: assetcategoryList): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.assetCategoryId+1}`;
   }
  }