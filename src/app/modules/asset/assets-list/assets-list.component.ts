import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { HttpService } from "src/app/shared/service/http/http.service";
import { Assets } from 'src/app/shared/models/asset';
import { AssetService } from '../asset-service/asset.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent {
  displayedColumns: string[] = ['select', 'assetId', 'category', 'serialNumber', 'model', 'status', 'assignEmp', 'assignDate', 'warrantyEnd', 'actions'];
  dataSource = new MatTableDataSource<Assets>;
  selection = new SelectionModel<Assets>(true, []);
  AssetsList: Assets[] = [];
  officeForm!: FormGroup;
  officeForm2!: FormGroup;
  officeForm3!: FormGroup;
  officeForm5!: FormGroup;
  assetsdetails!: FormGroup;
  assignasset!: FormGroup;
  deptId !: string;
  constructor(private AssestlistService: AssetService, private httpService: HttpService,private  toastr: ToastrService) {
    this.officeForm = new FormGroup({

      assetId: new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(6),
        Validators.pattern("[0-9]*")
        ], updateOn: 'change'
      }),
      serialNumber: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      brand: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      vendor: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      model: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      category: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      location: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      acquired: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      warrantyStart: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      warrantyEnd: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      status: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });
    this.officeForm3 = new FormGroup({
      assetId: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      serialNumber: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      brand: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      vendor: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      model: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      category: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      location: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      acquired: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      warrantyStart: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      warrantyEnd: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      status: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });
    this.officeForm5 = new FormGroup({
      assignEmp: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      assignDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    });
  }
  get assetId(): AbstractControl {
    return this.officeForm.get('assetId')!;
  }
  get serialNumber(): AbstractControl {
    return this.officeForm.get('serialNumber')!;
  }
  get brand(): AbstractControl {
    return this.officeForm.get('brand')!;
  }
  get vendor(): AbstractControl {
    return this.officeForm.get('vendor')!;
  }
  get model(): AbstractControl {
    return this.officeForm.get('model')!;
  }
  get category(): AbstractControl {
    return this.officeForm.get('serialno')!;
  }
  get location(): AbstractControl {
    return this.officeForm.get('location')!;
  }
  get acquired(): AbstractControl {
    return this.officeForm.get('acquired')!;
  }
  get warrantyStart(): AbstractControl {
    return this.officeForm.get('warrantyStart')!;
  }
  get warrantyEnd(): AbstractControl {
    return this.officeForm.get('warrantyEnd')!;
  }
  get status(): AbstractControl {
    return this.officeForm.get('status')!;
  }
  get assignEmp(): AbstractControl {
    return this.officeForm.get('assignEmp')!;
  }
  get assignDate(): AbstractControl {
    return this.officeForm.get('assignDate')!;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAssetsList();
    this.loadLocationOptions();
    this.loadBrandOptions();
    this.loadCategoryOptions();
    this.loadVendorOptions();
    this.loadEmployeeOptions();
  }
  onSubmit(officeForm: FormGroup) {
    officeForm.markAllAsTouched()
    if (officeForm.valid) {
      const currentDate = new Date().toISOString();
      let formObj = {
        "isActive": true,
        "createdOn": currentDate,
        "createdBy": "",
        "updatedOn": currentDate,
        "assetId": 0,
        "serialNumber": officeForm.value.serialNumber,
        "brand": officeForm.value.brand,
        "vendor": officeForm.value.vendor,
        "model": officeForm.value.model,
        "category": officeForm.value.category,
        "status": officeForm.value.status,
        "location": officeForm.value.location,
        "acquired": officeForm.value.acquired,
        "warrantyStart": officeForm.value.warrantyStart,
        "warrantyEnd": officeForm.value.warrantyEnd,
      }
      console.log(formObj)
      this.AssestlistService.saveAssetListDetail(formObj).subscribe(
        () => {
          this.getAssetsList();
          this.toastr.success("Asset List save successfully");
         
          this.showTabs = false;
          this.officeForm.reset();
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate AssetList data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the AssetList details");
          }
        }
      );
    }
    else {
      if (!officeForm.get('')?.value) {
        this.toastr.error("Please fill all values");
      }
    }
  }
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    this.imageUrl = null;
    this.officeForm.reset();
  }
  /////////////*Edit Popup///////////
  showEditTabs: boolean = false;
  closeFunction() {
    this.showEditTabs = !this.showEditTabs;
  }
  toggleEditTabs(deptId: any) {
    this.showEditTabs = !this.showEditTabs;
    let obj: any = {};
    obj = this.AssetsList.find((ele) => ele.assetId == parseInt(deptId));
    this.initializeForm(obj);
  }
  initializeForm(obj: any): void {
    if (this.showEditTabs) {
      this.officeForm2 = new FormGroup({
        assetId: new FormControl(obj.assetId, { validators: Validators.required, updateOn: 'submit' }),
        serialNumber: new FormControl(obj.serialNumber, { validators: Validators.required, updateOn: 'submit' }),
        brand: new FormControl(obj.brand, { validators: Validators.required, updateOn: 'submit' }),
        model: new FormControl(obj.model, { validators: Validators.required, updateOn: 'submit' }),
        category: new FormControl(obj.category, { validators: Validators.required, updateOn: 'submit' }),
        status: new FormControl(obj.status, { validators: Validators.required, updateOn: 'submit' }),
        location: new FormControl(obj.location, { validators: Validators.required, updateOn: 'submit' }),
        vendor: new FormControl(obj.vendor, { validators: Validators.required, updateOn: 'submit' }),
        acquired: new FormControl(obj.acquired, { validators: Validators.required, updateOn: 'submit' }),
        warrantyStart: new FormControl(obj.warrantyStart, { validators: Validators.required, updateOn: 'submit' }),
        warrantyEnd: new FormControl(obj.warrantyEnd, { validators: Validators.required, updateOn: 'submit' }),
      });
    }
  }
  onSubmitEdit(officeForm2: FormGroup) {
    officeForm2.markAllAsTouched()
    if (officeForm2.valid) {
      const currentDate = new Date().toISOString();
      const assetDetails = {
        assetId: officeForm2.get('assetId')?.value,
        serialNumber: officeForm2.get('serialNumber')?.value,
        brand: officeForm2.get('brand')?.value,
        model: officeForm2.get('model')?.value,
        category: officeForm2.get('category')?.value,
        status: officeForm2.get('status')?.value,
        location: officeForm2.get('location')?.value,
        vendor: officeForm2.get('vendor')?.value,
        acquired: officeForm2.get('acquired')?.value,
        warrantyStart: officeForm2.get('warrantyStart')?.value,
        warrantyEnd: officeForm2.get('warrantyEnd')?.value,
        isActive: true,
        createdOn: currentDate,
        createdBy: "",
        updatedOn: currentDate,
      }
      // Assuming this.AssestlistService.editAssetsListDetail() returns an Observable
      this.AssestlistService.editAssetsListDetail(assetDetails, officeForm2.get('assetId')?.value)
        .subscribe(
          () => {
            this.getAssetsList();
            this.toastr.success("Asset List Updated");
            this.showEditTabs = false;
          },
          (error) => {
            console.error(error);
            if (error.status === 500) {
              this.toastr.error("Duplicate Asset List data. Please enter unique data.");
            } else {
              this.toastr.error("Something went wrong while saving the Asset List details");
            }
          }
        );
    }

    else {
      if (!officeForm2.get('')?.value) {
        this.toastr.error("Duplicate Asset List data. Please enter unique data.");
 }
 }
  }
  // table data popup
  showData: boolean = false;
  toggleEdit() {
    this.showData = !this.showData;
  }
  addDepartments() {
    this.showData = false;
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  /////serial number data popup//////
  showSerialData: boolean = false;
  toggleSerialEdit() {
    this.showSerialData = !this.showSerialData;
    this.officeForm3.reset();
  }
  addSerial() {
    this.showSerialData = false;
  }
  preventCloseSerial(event: MouseEvent) {
    event.stopPropagation();
  }
  // serial data save 
  onSerialSubmit(officeForm3: FormGroup) {
    officeForm3.markAllAsTouched()
    if (officeForm3.valid) {
      const currentDate = new Date().toISOString();
      let formObj = {
        "isActive": true,
        "createdOn": currentDate,
        "createdBy": "",
        "updatedOn": currentDate,
        "assetId": 0,
        "serialNumber": officeForm3.value.serialNumber,
        "brand": officeForm3.value.brand,
        "vendor": officeForm3.value.vendor,
        "model": officeForm3.value.model,
        "category": officeForm3.value.category,
        "status": officeForm3.value.status,
        "location": officeForm3.value.location,
        "acquired": officeForm3.value.acquired,
        "warrantyStart": officeForm3.value.warrantyStart,
        "warrantyEnd": officeForm3.value.warrantyEnd,
      }
      console.log(formObj)
      this.AssestlistService.saveAssetListDetail(formObj).subscribe(
        () => {
          this.getAssetsList();
          this.toastr.success("Asset List save successfully");
          this.showSerialData = false;
          this.officeForm3.reset();
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate AssetList data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the AssetList details");
          }
        }
      );
    }
    else {
      if (!officeForm3.get('')?.value) {
        this.toastr.error("Please fill all values");
      }
    }
  }
  /////////Upload Image/////////
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
  addDepartment() {
    this.imageUrl = null;
    this.showTabs = false;
  }
  ////// assign popup in edit pop up/////
  showAssignEdit: boolean = false;
  onEditOptionSelected(event: Event, deptId: any) {
    this.showAssignEdit = !this.showAssignEdit;
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value === 'Assign') {
      this.showAssignEdit = true;
      close
    } else {
      this.showAssignEdit = false;
    }
    let obj: any = {};
    obj = this.AssetsList.find((ele) => ele.assetId == parseInt(deptId));
  }
  confirmEditAssign() {
    this.showAssignEdit = false;
    this.officeForm5.reset();
  }
  onSubmitEditAssign(officeForm5: FormGroup) {
    officeForm5.markAllAsTouched()
    if (officeForm5.valid) {
      const currentDate = new Date().toISOString();
      let formObj = {
        "assetId": 0,
        "assignDate": officeForm5.value.assignDate,
        "assignEmp": officeForm5.value.assignEmp,
        "serialNumber": "",
        "brand": "",
        "vendor": "",
        "model": "",
        "category": "",
        "status": "",
        "location": "",
        "acquired": "",
        "warrantyStart": "",
        "warrantyEnd": "",
        "createdOn": currentDate,
        "createdBy": "Amandeep"
      }
      console.log(formObj)
      this.AssestlistService.saveAssetListDetail(formObj).subscribe(
        () => {
          this.getAssetsList();
          this.toastr.success("Asset List save successfully");
          this.showAssignEdit = false;
          this.officeForm5.reset();
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate AssetList data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the AssetList details");
          }
        }
      );
    }
    else {
      if (!officeForm5.get('')?.value) {
        this.toastr.error("Please fill all values");
      }
    }
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
  checkboxLabel(row?: Assets): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.assetId + 1}`;
  }
  ///to listing element in form//
  getAssetsList() {
    this.AssestlistService.getAssetsListWithId().subscribe(res => {
      this.AssetsList = res;
      this.dataSource.data = this.AssetsList;
    });
  }
  // to bind dropdown of brand name
  BrandOptions: any[] = [];
  loadBrandOptions() {
    this.AssestlistService.getBrandOptions().subscribe(options => {
      this.BrandOptions = options;
    });
  }
  // to bind dropdown of location name
  LocationOptions: any[] = [];
  loadLocationOptions() {
    this.AssestlistService.getLocationOptions().subscribe(options => {
      this.LocationOptions = options;
    });
  }
  // to bind dropdown of category
  CategoryOptions: any[] = [];
  loadCategoryOptions() {
    this.AssestlistService.getCategoryOptions().subscribe(options => {
      this.CategoryOptions = options;
    });
  }
  // to bind dropdown of vendor
  VendorOptions: any[] = [];
  loadVendorOptions() {
    this.AssestlistService.getVendorOptions().subscribe(options => {
      this.VendorOptions = options;
    });
  }
  EmployeeOptions: any[] = [];
  loadEmployeeOptions() {
    this.AssestlistService.getEmployeeOptions().subscribe(options => {
      this.EmployeeOptions = options;
    });
  }
}