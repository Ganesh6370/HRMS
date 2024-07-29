import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';
import { projectList } from 'src/app/shared/models/task';
import { ConfigurationService } from "src/app/shared/service/http/configuration.service";
import { HttpService } from 'src/app/shared/service/http/http.service'; 
import { TaskService } from '../service/task.service'; 
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
interface Employee {
name: any;
value: any;
  empPersDtlId: number;
  fullName: string;
}


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements AfterViewInit {
  projectList: projectList[] = [];
  displayedColumns: string[] = ['select', 'projectId', 'projectName', 'projectLeader', 'teamLeader', 'priority','status', 'createdBy', 'createdOn', 'updatedBy', 'updatedOn','action'];

  dataSource: MatTableDataSource<projectList>;
  isFormSubmitted: boolean = false;
  isInputFieldTouchedOrDirty: boolean = false;
  selection = new SelectionModel<projectList
  >(true, []);

  updateForm!: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;
  validationForm!: FormGroup;
  public Editor = ClassicEditor;
  public editorConfig = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', '|',
      'link', 'bulletedList', 'numberedList', '|',
      'insertTable', '|',
      'undo', 'redo'
    ],
    height:'100px'
   };
  constructor(private router: Router,private toastr: ToastrService,private taskService: TaskService, private httpService: HttpService, private configuration: ConfigurationService){
    this.dataSource = new MatTableDataSource<projectList>();
    this.validationForm = new FormGroup({
      clientName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      projectName: new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*')
        ], updateOn: 'change'
      }),
      startDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      endDate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      projectRate: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      rateType: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      priority: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      projectLeader: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      teamLeader: new FormControl([], { validators: Validators.required, updateOn: 'change' }),
      projectDescriptions: new FormControl('', { validators: Validators.required, updateOn:'change'}),
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getProjectList();
    this.loadEmpOptions();
    this.loadOfficeOptions();
    this.filteredOptions=this.options;

    if (this.searchValue) {
      this.filterOptions(this.searchValue);
    }
  }
  
  get projectName(): AbstractControl {
    return this.validationForm.get('projectName')!;
  }
  get clientName(): AbstractControl {
    return this.validationForm.get("clientName")!;
  }
  get startDate(): AbstractControl {
    return this.validationForm.get("startDate")!;
  }
  get endDate(): AbstractControl {
    return this.validationForm.get("endDate")!;
  }
  get projectRate(): AbstractControl {
    return this.validationForm.get("projectRate")!;
  }
  get rateType(): AbstractControl {
    return this.validationForm.get("rateType")!;
  }
  get priority(): AbstractControl {
    return this.validationForm.get("priority")!;
  }
  get projectLeader(): AbstractControl {
    return this.validationForm.get("projectLeader")!;
  }
  get teamLeader(): AbstractControl {
    return this.validationForm.get("teamLeader")!;
  }
  get projectDescriptions(): AbstractControl {
    return this.validationForm.get("projectDescriptions")!;
  }

  onSubmit(validationForm: FormGroup) { 
    validationForm.markAllAsTouched()
    if (validationForm.valid) {
      const currentDate = new Date().toISOString();
      let formObj = {
        "isActive": true,
        "createdOn": currentDate,
        "createdBy": "",
        "updatedOn": currentDate,
        "projectId": 0,
        "projectName": validationForm.value.projectName,
        "clientName": validationForm.value.clientName,
        "startDate": validationForm.value.startDate,
        "endDate": validationForm.value.endDate,
        "projectRate": validationForm.value.projectRate,
        "rateType": validationForm.value.rateType,
        "priority": validationForm.value.priority,
        "projectLeader": validationForm.value.projectLeader,
        "teamLeader": validationForm.value.teamLeader.join(', '),
        "uploadFiles": validationForm.value.uploadFiles,
        "projectDescriptions": validationForm.value.projectDescriptions,
      }
      console.log(formObj)
      this.taskService.saveProjectDetail(formObj).subscribe(
        () => {
          this.getProjectList();
          this.toastr.success("Project saved successfully");
          this.showTabs = false;
          this.validationForm.reset();
        },
        (error) => {
          console.error(error);
          if (error.status === 500) {
            this.toastr.error("Duplicate project data. Please enter unique data.");
          } else {
            this.toastr.error("Something went wrong while saving the Project details");
          }
        }
      );
    }
    else {
      this.toastr.error("Please fill all values");
    }
  }

  /////////////*Edit Popup///////////
  showEdits: boolean = false;
  closeFunction() {
    this.showEdits = !this.showEdits;
  }
  toggleEdit(deptId: any) {
    this.showEdits = !this.showEdits;
    let obj: any = {};
    obj = this.projectList.find((ele) => ele.projectId == parseInt(deptId));
    this.initializeForm(obj);
  }
  initializeForm(obj: any): void {
    console.log(obj); // Log obj to check its contents
    if (this.showEdits) {

      const startDateObject = obj.startDate ? new Date(obj.startDate) : null;
      const endDateObject = obj.endDate ? new Date(obj.endDate) : null;

      const startDay = startDateObject ? startDateObject.getDate().toString().padStart(2, '0') : '';
      const startMonth = startDateObject ? (startDateObject.getMonth() + 1).toString().padStart(2, '0') : '';
      const startYear = startDateObject ? startDateObject.getFullYear() : '';

      const endDay = endDateObject ? endDateObject.getDate().toString().padStart(2, '0') : '';
      const endMonth = endDateObject ? (endDateObject.getMonth() + 1).toString().padStart(2, '0') : '';
      const endYear = endDateObject ? endDateObject.getFullYear() : '';

      const teamLeaderArray = obj.teamLeader.split(',').map((leader: string) => leader.trim());

      this.updateForm = new FormGroup({
        projectId: new FormControl(obj.projectId, { validators: Validators.required, updateOn: 'submit' }),
        projectName: new FormControl(obj.projectName, {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('[a-zA-Z ].*') 
          ],
          updateOn: 'change'
        }),
        clientName: new FormControl(obj.clientName, { validators: Validators.required, updateOn: 'submit' }),
        projectRate: new FormControl(obj.projectRate, { validators: Validators.required, updateOn: 'submit' }),
        rateType: new FormControl(obj.rateType, { validators: Validators.required, updateOn: 'submit' }),
        priority: new FormControl(obj.priority, { validators: Validators.required, updateOn: 'submit' }),
        projectLeader: new FormControl(obj.projectLeader, { validators: Validators.required, updateOn: 'submit' }),
        teamLeader: new FormControl(teamLeaderArray, { validators: Validators.required, updateOn: 'submit' }),
        projectDescriptions: new FormControl(obj.projectDescriptions || '', { validators: Validators.required, updateOn:'submit'}),
        // projectDescriptions: new FormControl(obj.projectDescriptions, { validators: Validators.required, updateOn: 'submit' }),
        // uploadFiles: new FormControl(obj.uploadFiles, { validators: Validators.required, updateOn: 'submit' }),
        startDate: new FormControl(startDateObject ? `${startYear}-${startMonth}-${startDay}` : '', { validators: Validators.required, updateOn: 'submit' }),
        endDate: new FormControl(endDateObject ? `${endYear}-${endMonth}-${endDay}`: '', { validators: Validators.required, updateOn: 'submit' }),
      });
    }
  }
  get ProjectName(): AbstractControl {
    return this.updateForm.get('projectName')!;
  }
  
  onSubmitEdit(updateForm: FormGroup) { 
    console.log(updateForm.valid);
    if (updateForm.valid) {
      const currentDate = new Date().toISOString();
      const originalProject = this.projectList.find(project => project.projectId === updateForm.get('projectId')?.value);
      if (!originalProject) {
        console.error("Original Project not found.");
        return;
      }
      const projectDetails = {
        projectId: updateForm.get('projectId')?.value, 
        projectName: updateForm.get('projectName')?.value,
        clientName: updateForm.get('clientName')?.value,
        projectRate: updateForm.get('projectRate')?.value,
        rateType: updateForm.get('rateType')?.value,
        priority: updateForm.get('priority')?.value,
        projectLeader: updateForm.get('projectLeader')?.value,
        teamLeader: updateForm.get('teamLeader')?.value.join(', '),
        projectDescriptions: updateForm.get('projectDescriptions')?.value,
        uploadFiles: updateForm.get('uploadFiles')?.value,
        startDate: updateForm.get('startDate')?.value,
        endDate: updateForm.get('endDate')?.value,
        isActive: true,
        createdOn: originalProject.createdOn,
        createdBy: originalProject.createdBy,
        // updatedBy:"",
        updatedOn: currentDate,
      };
      this.taskService.editProjectDetail(projectDetails, updateForm.get('projectId')?.value)
        .subscribe(
          () => {
            this.getProjectList();
            this.toastr.success("Project data Updated");
            this.showEdits = false;
          },
          (error) => {
            console.error(error);
            if (error.status === 500) {
              this.toastr.error("Duplicate Project data. Please enter unique data.");
            } else {
              this.toastr.error("Something went wrong while saving the Project details");
            }
          }
        );
    }
  }

  /////////////////////////////////////////////////////////

  //routing the project button clicking
  // openProjectDetail(): void {
  //   this.router.navigate(['/main/task/ProjectDet']);
  // }
  openProjectDetail(projectId: number): void {
    this.router.navigate(['/main/task/ProjectDet', projectId]);
 }

  //Listing data from api
  getProjectList() {
    this.taskService.getProjectWithId().subscribe(res => {
      this.projectList = res;
      this.dataSource.data = this.projectList;
    })
  }

  //code for edit close
  toggleTab() {
    this.showEdits = !this.showEdits;
    if (!this.showEdits) {
      this.validationForm.reset();
      this.isInputFieldTouchedOrDirty = false; // Reset the flag for input field
    }
  }
  cancelEdit(): void {
    this.validationForm.reset(); // Reset the form
    this.showEdits = false; // Hide the modal
  }

  // code for round button
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    if (!this.showTabs) {
      this.validationForm.reset();
      this.isInputFieldTouchedOrDirty = false; 
      this.toggleBodyOverflow();
      this.validationForm.reset();
      this.files = []; // Clear the selected image
      this.clearSearch();
    }
    
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }


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

  deleteUser(user: projectList) {
    // Implement delete logic here
    console.log('Deleting user:', user);
    this.contextMenu.closeMenu();
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: projectList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.projectId + 1}`;
  }

  toggleBodyOverflow() {
    document.body.style.overflow = this.showTabs ? 'hidden' : 'auto';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.toggleBodyOverflow(); // Toggle body overflow on window resize
  }

  // Upload icon
  url: string = "";
  files: {url: string, type: string}[] = [];

  previewFunction(event: any) {
    const filesList = event.target.files;
    if (filesList) {
      for (let i = 0; i < filesList.length; i++) {
        const file = filesList[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.files.push({url: e.target.result, type: file.type});
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // to bind dropdown to office name
  officeOptions: any[] = [];

  loadOfficeOptions() {
    this.taskService.getOfficeOptions().subscribe(options => {
      this.officeOptions = options;
    });
  }
  searchTerm: string = '';
  
  get filOptions() {
    return this.officeOptions.filter(option =>
      option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



  //employee data dropdown
  options: Employee[] = []; // Store fetched employee data
  filteredOptions: Employee[] = [];
  selectedOption!: string; 
  searchValue: string = '';

  loadEmpOptions() {
    this.taskService.getEmpOptions().subscribe(options => {
      this.options = options;
      this.filteredOptions = options; // Initially show all options
    });
  }
  private _filter(value: string): Employee[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterOptions(value: string) {
    this.searchValue = value;
    this.filteredOptions = this._filter(value);
  }
  clearSearch() {
    this.searchValue = ''; // Clear search term
    this.filteredOptions = this.options; // Show all options again
 }
 
}