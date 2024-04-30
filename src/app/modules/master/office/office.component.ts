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
  showQuestion: boolean = false;
  officeForm: FormGroup;

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
      zipCode: new FormControl(null, { validators: [Validators.required, Validators.pattern("^(?:[0-9]{6}|[0-9]{9})$")], updateOn: 'change' }),
      registrationNo: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      panNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]$")], updateOn: 'change' }),
      cinNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[A-Z][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$")], updateOn: 'change' }),
      gstIn: new FormControl(null, { validators: [Validators.required, Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]Z[0-9]$")], updateOn: 'change' }),
      bankDetail: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      inFavourOf: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      bankAccountNo: new FormControl(null, { validators: [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(11), Validators.maxLength(16)], updateOn: 'change' }),
      neftIsc: new FormControl(null, { validators: [Validators.required, Validators.pattern("[A-Z]+[0-9]+")], updateOn: 'change' }),
      logo: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      remarks: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      clientId: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    })
  }

  //#region FUNCTIONS FOR IMAGE POPOP

  //#region FUNCTION TO TOGGLE IMAGE AND SET IMAGE URL
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

  //#region FUNCTION TO CLOSE POPUP ON CLICKING CROSS BUTTON
  closePopup() {
    this.showQuestion = false;
  }
  //#endregion

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
  get logo(): AbstractControl {
    return this.officeForm.get('logo')!;
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
        "logo": officeForm.value.logo.trim(),
        "remarks": officeForm.value.remarks.trim(),
        "clientId": parseInt(officeForm.value.clientId)
      }

      console.log(formObj)

      this.masterService.saveOfficeDetail(formObj).subscribe(
        () => {
          this.toastr.success("Form submitted successfully");
          this.officeForm.reset();
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
      this.toastr.error("Please fill all values");

    }
  }

  displayedColumns: string[] = ['select','logo', 'officeName', 'shortCode', 'address', 'landmark', 'state', 'city', 'locality', 'phoneNumber', 'alternateNo', 'email', 'officeManager', 'omContactNo', 'omEmail', 'zipCode', 'registrationNo', 'cloth', 'cinNo', 'gstinNo', 'bankDetail', 'inFavourof', 'bankAccountNumber', 'paymentMode', 'remarks', 'clientId', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn', 'isActive', 'actions'];
  dataSource: MatTableDataSource<officeList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getDepartmentList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getDepartmentList() {
    this.masterService.getOfficeWithId().subscribe(res => {
      this.officeList = res;
      this.dataSource.data = this.officeList;
    });
  }


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