
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from '../asset-service/asset.service';
import { SelectionModel } from '@angular/cdk/collections';
import { assetcategoryList } from 'src/app/shared/models/asset';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/app/shared/service/http/configuration.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements AfterViewInit {

  selectedFile: File | null = null;
  createdOn: string = '';
  validationForm!: FormGroup;
  assetCategoryId!: string;
  category: string = '';
  categoryIcon: string = '';
  assetcategoryList: assetcategoryList[] = [];
  displayedColumns: string[] = ['select', 'categoryIcon', 'assetCategoryId', 'category', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'remarks', 'actions'];
  dataSource: MatTableDataSource<assetcategoryList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private assetService: AssetService, private toastr: ToastrService, private http: HttpClient,private configuration: ConfigurationService) {
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
      if (this.selectedFile) {
        const filename = this.appendCategoryNameToFilename(this.selectedFile.name, this.category.trim());
        this.savecategorydata(filename, form);
      } else {
        this.toastr.warning('No file selected!', 'Warning');
      }
    } else {
      this.toastr.error("Please fill in all details");
    }
  }
  appendCategoryNameToFilename(originalFilename: string, category: string): string {
    const fileParts = originalFilename.split('.');
    const newFilename = `${fileParts[0]}_${category}.${fileParts[1]}`;
    return newFilename;
  }
  savecategorydata(filename: string, form: FormGroup) {
    const currentDate = new Date().toISOString();
    const categoryDetails = {
      category: this.category.trim(),
      categoryIcon: filename,
      createdBy: "Ganesh",
      isActive: true,
      createdOn: currentDate,
      remarks: ""
    };
    this.assetService.saveCategoryDetail(categoryDetails).subscribe(
      () => {
        this.getCategoryList();
        this.toastr.success("Category save successfully");
        this.onImageSubmit(filename);
        this.showTabs = false;
        this.category = '';
        this.selectedFile = null;
        this.toggleTabs();
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
    this.selectedFile = null;
    this.validationForm.reset();
  }
  closeFunction() {
    this.showEdits = !this.showEdits;
    this.category = '';
    this.selectedFile = null;
    this.validationForm.reset();
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  /////////////*Edit Popup*//////////////

  showEdits: boolean = false;
  toggleEdit(deptId: any) {
    this.showEdits = !this.showEdits;
    let obj: any = {}
    obj = this.assetcategoryList.find((ele) => { return ele.assetCategoryId == parseInt(deptId) });
    this.category = obj.category.trim();
    this.categoryIcon = obj.categoryIcon;
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
      categoryIcon: this.selectedFile ? this.selectedFile.name : '',
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
        this.category = '';
        this.selectedFile = null;
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.assetCategoryId + 1}`;
  }



  toggleQuestion(imageUrl: string) {
    this.showQuestion = !this.showQuestion;
    this.currentModalImgUrl = imageUrl;
  }
  closePopup() {
    this.showQuestion = false;
  }

  showQuestion: boolean = false;
  currentModalImgUrl: string = '';

  savefile: any;

  //////////Image Upload///////// 
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  getObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }

  getImageURL(imageFileName: string): string {
    // Assuming that your images are stored in a specific directory (e.g., 'assets/category-icons/')
    // return `http://localhost:3000/service/assets/profile_image/${imageFileName}`;
    return `${this.configuration.imgbaseURL}${this.configuration.getImgCatBrand}${imageFileName}`;

  }

  onImageSubmit(filename: string): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, filename);

      this.http.post<{ message: string; filename: string }>('http://localhost:3000/upload', formData).subscribe(
        response => {
          this.toastr.success('Image uploaded successfully!', 'Success');
          this.toggleTabs();
          this.selectedFile = null;
        },
        error => {
          this.toastr.error('Upload failed. Please try again.', 'Error');
        }
      );
    } else {
      this.toastr.warning('No file selected!', 'Warning');
    }
  }
}