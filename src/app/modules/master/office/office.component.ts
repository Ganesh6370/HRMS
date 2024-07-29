import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../service/master.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { officeList } from 'src/app/shared/models/master';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent {

  officeForm: FormGroup;
  officeForm2: FormGroup;
  selectedFile: File | null = null;
  officeId!: string;
  createdOn: string = '';
  officeList: officeList[] = [];

  //#region STATE AND MAP TO SET IMAGE MODEL
  modalImgUrl: Map<string, string> = new Map<string, string>();
  currentModalImgUrl: string = ''
  validationForm: any;
  //#endregion
  constructor(private masterService: MasterService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<officeList>();
    //#region SET PATH AND TAG FOR IMAGES HERE
    this.modalImgUrl.set('gst', '../../../assets/img/office/GST.jpg')
    this.modalImgUrl.set('cin', '../../../assets/img/office/CIN.jpg')
    this.modalImgUrl.set('pan', '../../../assets/img/office/PAN.jpg')
    this.modalImgUrl.set('neft', '../../../assets/img/office/IFSC.jpg')
    //#endregion

    this.officeForm = new FormGroup({
      officeName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      shortCode: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      address: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      landmark: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      state: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      city: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      locality: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      phoneNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{10}$")], updateOn: 'change' }),
      alternateNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{10}$")], updateOn: 'change' }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'change' }),
      officeManager: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      OMContactNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{10}$")], updateOn: 'change' }),
      OMEmail: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'change' }),
      zipCode: new FormControl(null, { validators: [Validators.required, Validators.pattern("^([1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3})$")], updateOn: 'change' }),
      registrationNo: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      panNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")], updateOn: 'change' }),
      cinNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[A-Z][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$")], updateOn: 'change' }),
      gstIn: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]Z[0-9]$")], updateOn: 'change' }),
      bankDetail: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      inFavourOf: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      bankAccountNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(11), Validators.maxLength(16)], updateOn: 'change' }),
      neftIsc: new FormControl(null, { validators: [Validators.required, Validators.pattern("[A-Z]+[0-9]+")], updateOn: 'change' }),
      remarks: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      clientId: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    })
    this.officeForm2 = new FormGroup({
      officeName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      shortCode: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      address: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      landmark: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      state: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      city: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      locality: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      phoneNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{10}$")], updateOn: 'change' }),
      alternateNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{10}$")], updateOn: 'change' }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'change' }),
      officeManager: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      OMContactNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{10}$")], updateOn: 'change' }),
      OMEmail: new FormControl(null, { validators: [Validators.required, Validators.email], updateOn: 'change' }),
      zipCode: new FormControl(null, { validators: [Validators.required, Validators.pattern("^(?:[0-9]{6}|[0-9]{9})$")], updateOn: 'change' }),
      registrationNo: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      panNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")], updateOn: 'change' }),
      cinNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[A-Z][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$")], updateOn: 'change' }),
      gstIn: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]Z[0-9]$")], updateOn: 'change' }),
      bankDetail: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      inFavourOf: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      bankAccountNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(11), Validators.maxLength(16)], updateOn: 'change' }),
      neftIsc: new FormControl(null, { validators: [Validators.required, Validators.pattern("[A-Z]+[0-9]+")], updateOn: 'change' }),
      remarks: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      clientId: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    })
  }


  //#region FUNCTION TO TOGGLE IMAGE AND SET IMAGE URL
  showQuestion: boolean = false;
  toggleQuestion(imgName: string) {
    this.showQuestion = !this.showQuestion;
    this.currentModalImgUrl = this.modalImgUrl.get(imgName)!
  }
  //#endregion

  //#region FUNCTION TO STOP POPUP FROM CLOSING ON CLICKING
  preventCloses(event: MouseEvent) {
    event.stopPropagation();
  }
  //#endregion

  //#region  Fuction to For Table Image Popup
  showImage: boolean = false;
  toggleImage(imageUrl: string) {
    this.showImage = !this.showImage;
    this.currentModalImgUrl = imageUrl;
  }
  closeImagePopup() {
    this.showImage = false;
    this.showQuestion = false;
    this.showEdits = false;
    this.selectedFile = null;
    this.validationForm.reset();
  }
  //#endregion

  //#region OFFICE FORM GETTERS
  get officeName(): AbstractControl {
    return this.officeForm.get('officeName')!;
  }
  get shortCode(): AbstractControl {
    return this.officeForm.get('shortCode')!;
  }
  get address(): AbstractControl {
    return this.officeForm.get('address')!;
  }
  get landmark(): AbstractControl {
    return this.officeForm.get('landmark')!;
  }
  get state(): AbstractControl {
    return this.officeForm.get('state')!;
  }
  get city(): AbstractControl {
    return this.officeForm.get('city')!;
  }
  get locality(): AbstractControl {
    return this.officeForm.get('locality')!;
  }
  get phoneNo(): AbstractControl {
    return this.officeForm.get('phoneNo')!;
  }
  get alternateNo(): AbstractControl {
    return this.officeForm.get('alternateNo')!;
  }
  get email(): AbstractControl {
    return this.officeForm.get('email')!;
  }
  get officeManager(): AbstractControl {
    return this.officeForm.get('officeManager')!;
  }
  get OMContactNo(): AbstractControl {
    return this.officeForm.get('OMContactNo')!;
  }
  get OMEmail(): AbstractControl {
    return this.officeForm.get('OMEmail')!;
  }
  get zipCode(): AbstractControl {
    return this.officeForm.get('zipCode')!;
  }
  get registrationNo(): AbstractControl {
    return this.officeForm.get('registrationNo')!;
  }
  get panNo(): AbstractControl {
    return this.officeForm.get('panNo')!;
  }
  get cinNo(): AbstractControl {
    return this.officeForm.get('cinNo')!;
  }
  get gstIn(): AbstractControl {
    return this.officeForm.get('gstIn')!;
  }
  get bankDetail(): AbstractControl {
    return this.officeForm.get('bankDetail')!;
  }
  get inFavourOf(): AbstractControl {
    return this.officeForm.get('inFavourOf')!;
  }
  get bankAccountNo(): AbstractControl {
    return this.officeForm.get('bankAccountNo')!;
  }
  get neftIsc(): AbstractControl {
    return this.officeForm.get('neftIsc')!;
  }
  get remarks(): AbstractControl {
    return this.officeForm.get('remarks')!;
  }
  get clientId(): AbstractControl {
    return this.officeForm.get('clientId')!;
  }
  //#endregion


  changeToUpperCase(inputName: string) {
    let str = this.officeForm.get(inputName)
    str?.setValue(str.value.toUpperCase())
  }

  handleFormSubmission(officeForm: FormGroup) {
    officeForm.markAllAsTouched()
    if (officeForm.valid) {
      const currentDate = new Date().toISOString();
      let formObj = {
        "isActive": true,
        "updatedOn": currentDate,
        "createdOn": currentDate,
        "createdBy": "Ganesh",
        "officeName": officeForm.value.officeName.trim(),
        "shortCode": officeForm.value.shortCode.trim(),
        "address": officeForm.value.address.trim(),
        "landmark": officeForm.value.landmark.trim(),
        "state": officeForm.value.state.trim(),
        "city": officeForm.value.city.trim(),
        "locality": officeForm.value.locality.trim(),
        "phoneNumber": officeForm.value.phoneNo.trim(),
        "alternateNo": officeForm.value.alternateNo.trim(),
        "email": officeForm.value.officeName.trim(),
        "officeManager": officeForm.value.officeManager.trim(),
        "omContactNo": officeForm.value.OMContactNo.trim(),
        "omEmail": officeForm.value.OMEmail.trim(),
        "zipCode": officeForm.value.zipCode.trim(),
        "registrationNo": officeForm.value.registrationNo.trim(),
        "cloth": officeForm.value.panNo.trim(),
        "cinNo": officeForm.value.cinNo.trim(),
        "gstinNo": officeForm.value.gstIn.trim(),
        "bankDetail": officeForm.value.bankDetail.trim(),
        "inFavourof": officeForm.value.inFavourOf.trim(),
        "bankAccountNumber": officeForm.value.bankAccountNo.trim(),
        "paymentMode": officeForm.value.neftIsc.trim(),
        "logo": this.selectedFile ? this.selectedFile.name : '',
        "remarks": officeForm.value.remarks.trim(),
        "clientId": parseInt(officeForm.value.clientId)
      }

      console.log(formObj)

      this.masterService.saveOfficeDetail(formObj).subscribe(
        () => {
          this.getOfficeList();
          this.toastr.success("Form submitted successfully");
          this.officeForm.reset();
          this.selectedFile = null;
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate Office data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the Office details");
          }
        }
      );
    }
    else {
      if (!officeForm.get('officeName')?.value) {
        this.toastr.error("Please enter a Office Name");
      }
      else if (!officeForm.get('shortCode')?.value) {
        this.toastr.error("Please enter a Short Code");
      }
      else if (!officeForm.get('address')?.value) {
        this.toastr.error("Please enter an Address");
      }
      else if (!officeForm.get('landmark')?.value) {
        this.toastr.error("Please enter a Land Mark");
      }
      else if (!officeForm.get('state')?.value) {
        this.toastr.error("Please enter a State");
      }
      else if (!officeForm.get('city')?.value) {
        this.toastr.error("Please enter a City");
      }
      else if (!officeForm.get('locality')?.value) {
        this.toastr.error("Please enter a Locality");
      }
      else if (!officeForm.get('phoneNo')?.value) {
        this.toastr.error("Phone Number must be 10 digit required");
      }
      else if (!officeForm.get('alternateNo')?.value) {
        this.toastr.error("Alternet Number must be 10 digit required");
      }
      else if (!officeForm.get('email')?.value) {
        this.toastr.error("Please enter a valid email address");
      }
      else if (!officeForm.get('officeManager')?.value) {
        this.toastr.error("Please enter a Office Manager");
      }
      else if (!officeForm.get('OMContactNo')?.value) {
        this.toastr.error("OM Contact Number must be 10 digit required");
      }
      else if (!officeForm.get('OMEmail')?.value) {
        this.toastr.error("Please enter a valid OM Email address");
      }
      else if (!officeForm.get('zipCode')?.value) {
        this.toastr.error("Please enter a valid Zip Code");
      }
      else if (!officeForm.get('registrationNo')?.value) {
        this.toastr.error("Please enter a valid Registration No");
      }
      else if (!officeForm.get('panNo')?.value) {
        this.toastr.error("Please enter a valid PAN Number");
      }
      else if (!officeForm.get('cinNo')?.value) {
        this.toastr.error("Please enter a valid CIN Number");
      }
      else if (!officeForm.get('gstIn')?.value) {
        this.toastr.error("Please enter a valid GST Number");
      }
      else if (!officeForm.get('bankAccountNo')?.value) {
        this.toastr.error("Bank Account Number is 11 to 16 digit required");
      }
      else if (!officeForm.get('neftIsc')?.value) {
        this.toastr.error("Please enter a valid NEFT IFSC Code");
      }
    }
  }
  //#region Table List
  displayedColumns: string[] = ['select', 'logo', 'officeName', 'shortCode', 'address', 'landmark', 'state', 'city', 'locality', 'phoneNumber', 'alternateNo', 'email', 'officeManager', 'omContactNo', 'omEmail', 'zipCode', 'registrationNo', 'cloth', 'cinNo', 'gstinNo', 'bankDetail', 'inFavourof', 'bankAccountNumber', 'paymentMode', 'remarks', 'clientId', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<officeList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getOfficeList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getOfficeList() {
    this.masterService.getOfficeWithId().subscribe(res => {
      this.officeList = res;
      this.dataSource.data = this.officeList;
    });
  }
  //#endregion

  ///////For Check_Box////////////
  selection = new SelectionModel<officeList>(true, []);

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

  checkboxLabel(row?: officeList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.officeId + 1}`;
  }

  /////////Upload Image/////////

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  getObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }
  getImageURL(imageFileName: string): string {
    // Assuming that your images are stored in a specific directory (e.g., 'assets/category-icons/')
    return `assets/img/category/${imageFileName}`;
  }
  
  /////////////Edit Popup//////////////

  showEdits: boolean = false;
  toggleEdit(deptId: any) {
    this.showEdits = !this.showEdits;
    let obj: any = this.officeList.find((ele) => ele.officeId == parseInt(deptId));
    this.initializeForm(obj);
  
    if (obj) {
      this.officeId = obj.officeId; // Set the current office ID
      this.initializeForm(obj);
    } else {
      console.error("Office object not found for deptId: ", deptId);
    }
    
  }
  initializeForm(obj: any): void {
    // Initialize the form with default values
    if (this.showEdits) {
      this.officeForm2 = new FormGroup({

        officeName: new FormControl(obj.officeName, { validators: Validators.required, updateOn: 'submit' }),
        shortCode: new FormControl(obj.shortCode, { validators: Validators.required, updateOn: 'submit' }),
        address: new FormControl(obj.address, { validators: Validators.required, updateOn: 'submit' }),
        landmark: new FormControl(obj.landmark, { validators: Validators.required, updateOn: 'submit' }),
        state: new FormControl(obj.state, { validators: Validators.required, updateOn: 'submit' }),
        city: new FormControl(obj.city, { validators: Validators.required, updateOn: 'submit' }),
        locality: new FormControl(obj.locality, { validators: Validators.required, updateOn: 'submit' }),
        phoneNo: new FormControl(obj.phoneNumber, { validators: Validators.required, updateOn: 'submit' }),
        alternateNo: new FormControl(obj.alternateNo, { validators: Validators.required, updateOn: 'submit' }),
        email: new FormControl(obj.email, { validators: Validators.required, updateOn: 'submit' }),
        officeManager: new FormControl(obj.officeManager, { validators: Validators.required, updateOn: 'submit' }),
        OMContactNo: new FormControl(obj.omContactNo, { validators: Validators.required, updateOn: 'submit' }),
        OMEmail: new FormControl(obj.omEmail, { validators: Validators.required, updateOn: 'submit' }),
        zipCode: new FormControl(obj.zipCode, { validators: Validators.required, updateOn: 'submit' }),
        registrationNo: new FormControl(obj.registrationNo, { validators: Validators.required, updateOn: 'submit' }),
        panNo: new FormControl(obj.cloth, { validators: Validators.required, updateOn: 'submit' }),
        cinNo: new FormControl(obj.cinNo, { validators: Validators.required, updateOn: 'submit' }),
        gstIn: new FormControl(obj.gstinNo, { validators: Validators.required, updateOn: 'submit' }),
        bankDetail: new FormControl(obj.bankDetail, { validators: Validators.required, updateOn: 'submit' }),
        inFavourOf: new FormControl(obj.inFavourof, { validators: Validators.required, updateOn: 'submit' }),
        bankAccountNo: new FormControl(obj.bankAccountNumber, { validators: Validators.required, updateOn: 'submit' }),
        neftIsc: new FormControl(obj.paymentMode, { validators: Validators.required, updateOn: 'submit' }),
        clientId: new FormControl(obj.clientId, { validators: Validators.required, updateOn: 'submit' }),
        remarks: new FormControl(obj.remarks, { validators: Validators.required, updateOn: 'submit' }),
      });
    }
    console.log(this.officeId)
  }

  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }
  closeFunction() {
    this.showEdits = !this.showEdits;
    this.selectedFile = null;
    this.selectedFile = null;
    this.validationForm.reset();
  }
  handleFormUpdateSubmission(officeForm2: FormGroup) {
    officeForm2.markAllAsTouched()
    if (officeForm2.valid) {
      const currentDate = new Date().toISOString();
      let formObjs = {
        "isActive": true,
        "updatedOn": currentDate,
        "createdOn": currentDate,
        "createdBy": "Ganesh",
        "officeName": officeForm2.value.officeName.trim(),
        "shortCode": officeForm2.value.shortCode.trim(),
        "address": officeForm2.value.address.trim(),
        "landmark": officeForm2.value.landmark.trim(),
        "state": officeForm2.value.state.trim(),
        "city": officeForm2.value.city.trim(),
        "locality": officeForm2.value.locality.trim(),
        "phoneNumber": officeForm2.value.phoneNo.trim(),
        "alternateNo": officeForm2.value.alternateNo.trim(),
        "email": officeForm2.value.officeName.trim(),
        "officeManager": officeForm2.value.officeManager.trim(),
        "omContactNo": officeForm2.value.OMContactNo.trim(),
        "omEmail": officeForm2.value.OMEmail.trim(),
        "zipCode": officeForm2.value.zipCode.trim(),
        "registrationNo": officeForm2.value.registrationNo.trim(),
        "cloth": officeForm2.value.panNo.trim(),
        "cinNo": officeForm2.value.cinNo.trim(),
        "gstinNo": officeForm2.value.gstIn.trim(),
        "bankDetail": officeForm2.value.bankDetail.trim(),
        "inFavourof": officeForm2.value.inFavourOf.trim(),
        "bankAccountNumber": officeForm2.value.bankAccountNo.trim(),
        "paymentMode": officeForm2.value.neftIsc.trim(),
        "logo": this.selectedFile ? this.selectedFile.name : '',
        "remarks": officeForm2.value.remarks.trim(),
        "clientId": parseInt(officeForm2.value.clientId)
        
      }
      console.log("Form Objects to be submitted: ", this.officeId);
      this.masterService.editOfficeDetail(formObjs, this.officeId).subscribe(
        () => {
          this.getOfficeList();
          this.toastr.success("Form submitted successfully");
          this.showEdits = false;
          this.selectedFile = null;
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate Office data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the Office details");
          }
        }
      );
    }
    else {
      if (!officeForm2.get('')?.value) {
        this.toastr.error("Please enter a Office Name");

 }
}
}
 //#region added by Amandeep Virdhi on 19-07-2024
 isNumberKey(event: KeyboardEvent): boolean {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    event.preventDefault();
    return false;
  }
  return true;
}
 //#endregion
}