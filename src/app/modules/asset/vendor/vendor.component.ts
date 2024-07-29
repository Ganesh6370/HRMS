
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';  

import { HttpService } from 'src/app/shared/service/http/http.service';
import { getAssetVonders } from 'src/app/shared/models/asset';
import { AssetService } from '../asset-service/asset.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements AfterViewInit {
  name: string = '';
  vendorId: string = '';
  mobile: string='';
  alternateMobile: string='';
  emailId: string='';
  address: string='';
  state: string='';
  city: string='';
  zipcode: string='';
  gstin: string='';
  remarks: string='';
  submittedform=false;
  submittededit=false;
  AssetVonderList: Array<getAssetVonders> = [];
  showOptions: boolean[] = [];
  AssetVonderForm2!: FormGroup;
  AssetVonderForm!: FormGroup;
  getAssetVonders: getAssetVonders[] = [];
  dataSource: MatTableDataSource<getAssetVonders>;
  showTabs: boolean=false;
  getAssetvonder: any;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAssetVonder();
  }
  constructor(private assetService: AssetService, private httpService: HttpService,private fb: FormBuilder,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource<getAssetVonders>();
    this.AssetVonderForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(2),
        Validators.pattern("[a-zA-Z].*")
        ], updateOn: 'change'
      }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'change' }),
      address: new FormControl(null, [Validators.required]),
      contactNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^\\+?[0-9]{10,12}$")], updateOn: 'change' }),
      // contactNo: new FormControl(null, {
      //   validators: [Validators.required,
      //   Validators.minLength(10),
      //   Validators.maxLength(10),
      //   Validators.pattern("[0-9]*")
      //   ], updateOn: 'change'
      // }),
      organizN: new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(2),
        Validators.pattern("[a-zA-Z].*")
        ], updateOn: 'change'
      }),
      alternatPh: new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("[0-9]*")
        ], updateOn: 'change'
      }),
      state: new FormControl(null, {
        validators: [Validators.required,
        Validators.pattern("[a-zA-Z].*")
        ], updateOn: 'change'
      }),
      city: new FormControl(null, {
        validators: [Validators.required,
        Validators.pattern("[a-zA-Z].*")
        ], updateOn: 'change'
      }),
      zipcode: new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern("^([1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3})$")],
         updateOn: 'change'
      }),
      remarks: new FormControl(null, [Validators.required])
    });
    this.AssetVonderForm2 = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      contactNo: new FormControl(null, [Validators.required]),
      organizN: new FormControl(null, [Validators.required]),
      alternatPh: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      zipcode: new FormControl(null, [Validators.required]),
      remarks: new FormControl(null, [Validators.required])
    })
  }
  get Name(): FormControl {
    return this.AssetVonderForm.get('name') as FormControl;
  }
  get Email(): FormControl {
    return this.AssetVonderForm.get('email') as FormControl;
  }
  get Address(): FormControl {
    return this.AssetVonderForm.get('address') as FormControl;
  }
  get ContactNo(): FormControl {
    return this.AssetVonderForm.get('contactNo') as FormControl;
  }
  get OrganizN(): FormControl {
    return this.AssetVonderForm.get('organizN') as FormControl;
  }
  get AlternatPh(): FormControl {
    return this.AssetVonderForm.get('alternatPh') as FormControl;
  }
  get State(): FormControl {
    return this.AssetVonderForm.get('state') as FormControl;
  }
  get City(): FormControl {
    return this.AssetVonderForm.get('city') as FormControl;
  }
  get Zipcode(): FormControl {
    return this.AssetVonderForm.get('zipcode') as FormControl;
  }
  get Remarks(): FormControl {
    return this.AssetVonderForm.get('remarks') as FormControl;
  }
  // pop up form
  onSubmit(AssetVonderForm: FormGroup) {
    this.submittedform=true;
    console.log(this.submittedform,AssetVonderForm.controls['name'].errors);
      console.log("on sumbmit button is working ");
      AssetVonderForm.markAllAsTouched()
      if (AssetVonderForm.valid) {
        const currentDate = new Date().toISOString();
        let formObj = {
          "isActive": true,
          "createdOn": currentDate,
          "createdBy": "",
          "updatedBy": "",
          "updatedOn": currentDate,
          "vendorId": 0,
          "name": AssetVonderForm.value.name,
          "mobile": AssetVonderForm.value.contactNo.toString(), 
          "alternateMobile": AssetVonderForm.value.alternatPh.toString(),
          "emailId": AssetVonderForm.value.email,
          "address": AssetVonderForm.value.address,
          "state": AssetVonderForm.value.state,
          "city": AssetVonderForm.value.city,
          "zipcode": AssetVonderForm.value.zipcode.toString(),
          "gstin": AssetVonderForm.value.organizN,
          "remarks": AssetVonderForm.value.remarks,
        }
        console.log(formObj)
        this.assetService.saveAssetVonderlDetail(formObj).subscribe(
          () => {
            this.getAssetVonder();
            this.submittedform=false;
            this.toastr.success("Vendor data save successfully");
            this.showTabs = false;
            this.AssetVonderForm.reset();
          },
          (error) => {
            console.error(error);
            if (error.status === 500) {
              this.toastr.error("Duplicate Vendor data. Please enter unique data.");
            } else {
              this.toastr.error("Something went wrong while saving the Vendor details");
            }
          }
        );
      }
      else {
        if (!AssetVonderForm.get('')?.value) {
          this.toastr.error("Please fill all values");
        }
      }
    }
  ngOnInit() {
    this.getAssetVonder();
  }
  //Get data from Api
  getAssetVonder() {
    this.assetService.getListAssetVender().subscribe(
      (res) => {
        this.AssetVonderList = res;
        this.dataSource.data = this.AssetVonderList;
        console.log(res);
        this.showOptions = res.map(() => false); // Initialize showOptions for each item
      },
      (error) => {
        console.error(error);
      }
    );
  }
  displayedColumns: string[] = ['select', 'id', 'name', 'phone', 'email', 'address', 'state', 'city', 'zipCode', 'organization', 'remark', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'action'];
  selection = new SelectionModel<getAssetVonders>(true, []);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;
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
  editUser(user: getAssetVonders) {
    // Implement edit logic here
    console.log('Editing user:', user);
    this.contextMenu.closeMenu();
  }
  /////////////*Edit Popup///////////
  showEdits: boolean = false;
  toggleEdit(vendorID: any) {
    this.showEdits = !this.showEdits;
    let obj: any = {};
    obj = this.AssetVonderList.find((ele) => { return ele.vendorId == parseInt(vendorID) });
    this.vendorId = obj.vendorId
    this.name = obj.name;
    this.emailId = obj.emailId;
    this.address = obj.address;
    this.gstin = obj.gstin;
    this.mobile = obj.mobile;
    this.alternateMobile = obj.alternateMobile;
    this.state = obj.state;
    this.city = obj.city;
    this.zipcode = obj.zipcode;
    this.remarks = obj.remarks;
  }
  preventCloses(event: MouseEvent) {
    event.stopPropagation();
  }
  editVendorData(AssetVonderForm2: FormGroup) {
    this.submittededit = true;
    console.log("on sumbmit button is working ");
    AssetVonderForm2.markAllAsTouched()
    if (AssetVonderForm2.valid) {
      const currentDate = new Date().toISOString();
      const AssetVonderDetails = {
        "isActive": true,
        "createdOn": currentDate,
        "createdBy": "",
        "updatedBy": "",
        "updatedOn": currentDate,
        "vendorId": 0,
        "name": AssetVonderForm2.value.name,
        "mobile": AssetVonderForm2.value.contactNo.toString(),
        "alternateMobile": AssetVonderForm2.value.contactNo.toString(),
        "emailId": AssetVonderForm2.value.email,
        "address": AssetVonderForm2.value.address,
        "state": AssetVonderForm2.value.state,
        "city": AssetVonderForm2.value.city,
        "zipcode": AssetVonderForm2.value.zipcode.toString(),
        "gstin": AssetVonderForm2.value.organizN,
        "remarks": AssetVonderForm2.value.remarks,
      }
      this.assetService.editAssetVenderDetails(AssetVonderDetails, this.vendorId)
        .subscribe(() => {
          this.getAssetVonder();
          this.toastr.success("Vendor Updated");
          this.showEdits = false;
        },
          (error) => {
            console.error(error);
            if (error.status === 500) {
              this.submittededit = false;
              console.log(AssetVonderDetails);
              this.toastr.error("Duplicate vendor  data. Please enter unique data.");
            } else {
              this.toastr.error("Something went wrong while saving the vendor  details");
            }
          }
        );
    }
  }
  deleteUser(user: getAssetVonders) {
    // Implement delete logic here
    console.log('Deleting user:', user);
    this.contextMenu.closeMenu();
  }
  closeFunction() {
    this.showEdits = !this.showEdits;
    this.AssetVonderForm.reset();
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: getAssetVonders): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.vendorId + 1}`;
  }
  toggleTabs() {
    this.submittedform = false;
    this.showTabs = !this.showTabs;
    this.AssetVonderForm.reset();
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
}
isNumberKey(event: KeyboardEvent): boolean {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }
  return true;
}
}