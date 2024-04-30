import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from '../asset-service/asset.service';
import { SelectionModel } from '@angular/cdk/collections';
import { assetbrandList } from 'src/app/shared/models/asset';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements AfterViewInit {

  createdOn: string = '';
  validationForm!: FormGroup;
  assetBrandId!: string;
  brand: string = '';
  brandIcon: string = '';
  assetbrandList: assetbrandList[] = [];
  displayedColumns: string[] = ['select', 'assetBrandId', 'brandIcon', 'brand', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<assetbrandList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private assetService: AssetService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<assetbrandList>();
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
      this.savebranddata();
    }
    else {
      this.toastr.error("Please filled Details")
    }
  }
  savebranddata() {
    const currentDate = new Date().toISOString();
    const brandDetails = {
      brand: this.brand.trim(),
      brandIcon: this.brandIcon,
      createdBy: "Ganesh",
      isActive: true,
      createdOn: currentDate
    };
    this.assetService.saveBrandDetail(brandDetails).subscribe(
      () => {
        this.getBrandList();
        this.toastr.success("Brand save successfully");
        this.showTabs = false;
        this.brand = '';
        this.brandIcon = '';
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          this.toastr.error("Duplicate Brand data. Please enter unique data.");
        } else {
          this.toastr.error("Something went wrong while saving the Brand details");
        }
      }
    );
  }
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    this.brand = '';
    this.brandIcon = '';
    this.validationForm.reset();
  }
  closeFunction() {
    this.showEdits = !this.showEdits;
    this.brand = '';
    this.brandIcon = '';
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
    obj = this.assetbrandList.find((ele) => { return ele.assetBrandId == parseInt(deptId) });
    this.brand = obj.brand.trim();
    this.brandIcon = obj.brandIcon;
    this.assetBrandId = obj.assetBrandId;
    this.createdOn = obj.createdOn;
  }
  preventCloses(event: MouseEvent) {
    event.stopPropagation();
  }

  editbranddata(): void {
    const currentDate = new Date().toISOString();
    const brandDetails = {
      brand: this.brand,
      brandIcon: this.brandIcon,
      createdBy: "Ganesh",
      updatedBy: "Ganesh",
      isActive: true,
      updatedOn: currentDate,
      createdOn: this.createdOn
    };
    this.assetService.editBrandDetail(brandDetails, this.assetBrandId).subscribe(
      () => {
        this.getBrandList();
        this.toastr.success("Brand Updated");
        this.showEdits = false;
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          this.toastr.error("Duplicate Brand data. Please enter unique data.");
        } else {
          this.toastr.error("Something went wrong while saving the Brand details");
        }
      }
    );
  }

  /////////////////////////////////////////////////////////////////


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getBrandList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getBrandList() {
    this.assetService.getBrandWithId().subscribe(res => {
      this.assetbrandList = res;
      this.dataSource.data = this.assetbrandList;
    });
  }


  ///////For Check_Box////////////
  selection = new SelectionModel<assetbrandList>(true, []);

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

  checkboxLabel(row?: assetbrandList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.assetBrandId + 1}`;
  }

  /////////*Upload Image*/////////

  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}