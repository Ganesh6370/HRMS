import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { employeeList } from 'src/app/shared/models/employeelist';
import { EmployeeServiceService } from 'src/app/modules/employee/employee-service/employee-service.service';
import { interval, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  categoryGroup: Array<employeeList> = [];
  showOptions: boolean[] = [];
  defaultImage: string = '/assets/img/profile.png';
  numCardsToShow: number = 20;
  cardsToLoad: number = 20;
  loading: boolean = false; // Flag to indicate loading state
  observer: IntersectionObserver | undefined; // Intersection observer instance
  searchQuery: string = '';
  filteredCategoryGroup: any[] = [];
  constructor(private EmployeeServiceService: EmployeeServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getEmployeeList();
    this.empRegId = this.getEmpRegId();
    this.loadProjectOptions();
    this.loadDepartmentOptions();
    this.loadManagerOptions();
  }

  ngAfterViewInit() {
    // Initialize the Intersection Observer
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.loading) {
        this.loadMore();
      }
    }, { threshold: 0.5 });

    this.observeLastCard();
  }

  ngOnDestroy() {
    // Disconnect the observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  // this function for all employee but footer in new function for current user get
  //   getEmployeeList() {
  //     this.loading = true;
  //     this.EmployeeServiceService.getListEmployee().subscribe(
  //       (res) => {
  //         this.categoryGroup = res;
  //         this.filteredCategoryGroup = [...this.categoryGroup];
  //         this.showOptions = res.map(() => false);
  //         this.loading = false; 
  //         this.observeLastCard();
  //       },
  //       (error) => {
  //         console.error(error);
  //         this.loading = false;
  //    }
  //  );
  //  }

  getImageURL(imageFileName: string): string {
    if (imageFileName && typeof imageFileName !== 'string') {
      return `assets/img/${imageFileName}`;
    } else {
      return this.defaultImage;
    }
  }

  //store last click 
  lastClick: number = Infinity;
  toggleOptions(index: number) {
    if (this.lastClick != Infinity && this.lastClick != index) {
      this.showOptions[this.lastClick] = false;
    }

    this.showOptions[index] = !this.showOptions[index];
    this.lastClick = index;
  }

  sendItem(item: any) {
    console.log("hello", item);
    this.router.navigate(['../main/employee/profile'], { queryParams: { empid: item } });
  }

  loadMore() {
    if (!this.loading && this.numCardsToShow < this.categoryGroup.length) {
      this.loading = true;
      setTimeout(() => {
        this.numCardsToShow += this.cardsToLoad;
        if (this.numCardsToShow > this.categoryGroup.length) {
          this.numCardsToShow = this.categoryGroup.length;
        }
        this.loading = false;
        this.observeLastCard(); // Observe the new last card
      }, 2000);
    }
  }

  observeLastCard() {
    if (this.observer) {
      this.observer.disconnect(); // Disconnect previous observation
    }

    setTimeout(() => {
      const lastCard = document.querySelector('.main5 .card:last-child');
      if (lastCard && this.observer) {
        this.observer.observe(lastCard);
      }
    }, 100); // Delay to ensure new cards are rendered before observing
  }

  isLastCardVisible(): boolean {
    const lastCard = document.querySelector('.main5 .card:last-child');
    if (lastCard) {
      const rect = lastCard.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    }
    return false;
  }
  //#region Added By Ganesh for profile Img Uploade on 22 June 2024
  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    //  this.brand = '';
    //  this.selectedFile = null;
    //  this.validationForm.reset();
  }
  closeFunction() {
    this.showTabs = !this.showTabs;
    this.selectedFile = null;
    //  this.validationForm.reset();
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  /////////Upload Image/////////
  selectedFile: File | null = null;


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }
  getImageURL2(imageFileName: string): string {
    return `assets/img/${imageFileName}`;
  }
  //#endregion
  //#region added by sapna for search on 1 June 2024
  search() {
    if (this.searchQuery.trim()) {
      this.filteredCategoryGroup = this.categoryGroup.filter(item =>
        item.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    else {
      this.filteredCategoryGroup = [...this.categoryGroup];
      if (this.filteredCategoryGroup.length === 0) {
        this.toastr.error('No data is available');
      }
    }
  }
  //#end region
  //#region added by sapna on 03 july 2024 for page redirect employment and login
  selectedEmpRegId: string = '';
  redirectToEmployment(empRegId: string) {
    this.selectedEmpRegId = empRegId;
    console.log(this.selectedEmpRegId);
    this.router.navigate(['../main/employee/employement'], { queryParams: { empRegId: empRegId } });
  }

  redirectToEmploymentAndOpenLogin(empId: string) {
    this.selectedEmpRegId = empId;
    this.router.navigate(['../main/employee/employement'], { queryParams: { empId: empId } });

  }
  //#endregion

  //#region  project dropdown in employee dashboard added by Amandeep Virdhi : 03/07/2024
  filteredProjectOptions: any[] = [];
  options: any[] = [];
  selectedOption!: string;
  searchValue: string = '';

  loadProjectOptions() {
    this.EmployeeServiceService.getProjectOptions().subscribe(options => {
      this.options = options;
      this.filteredProjectOptions = options;
    });
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterOptions(value: string) {
    this.searchValue = value;
    this.filteredProjectOptions = this._filter(value);
  }

  clearSearch() {
    this.searchValue = ''; // Clear search term
    this.filteredProjectOptions = this.options;
  }
  //for department dropdown
  filteredDepartmentOptions: any[] = [];
  optionsDepartment: any[] = [];
  selectedDepartmentOption!: string;
  searchDepartmentValue: string = '';

  filterDepartmentOptions(value: string) {
    this.searchDepartmentValue = value;
    this.filteredDepartmentOptions = this.optionsDepartment.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  clearDepartmentSearch() {
    this.searchDepartmentValue = '';
    this.filteredDepartmentOptions = this.optionsDepartment;
  }

  loadDepartmentOptions() {
    this.EmployeeServiceService.getDepartmentOptions().subscribe(options => {
      this.optionsDepartment = options;
      this.filteredDepartmentOptions = options;
    });
  }
  //#endregion
  //#region Added by amandeep on 08 july 2024 for Manager Dropdown
  filteredManagerOptions: any[] = [];
  optionsManager: any[] = [];
  selectedManagerOption!: string;
  searchManagerValue: string = '';

  filterManagerOptions(value: string) {
    this.searchManagerValue = value;
    this.filteredManagerOptions = this.optionsManager.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  clearManagerSearch() {
    this.searchManagerValue = '';
    this.filteredManagerOptions = this.optionsManager;
  }

  loadManagerOptions() {
    this.EmployeeServiceService.getManagerOptions().subscribe(options => {
      this.optionsManager = options;
      this.filteredManagerOptions = options;
    });
  }

  //#endregion

  //#region added by Amandeep Virdhi on 18-07-2024
  getEmployeeList() {
    this.loading = true;
    const empRegId = this.getEmpRegId() || '';
    this.EmployeeServiceService.getListEmployee().subscribe(
      (res) => {
        this.categoryGroup = res;
        if (empRegId == '6') {
          this.filteredCategoryGroup = [...this.categoryGroup];
        } 
        else 
        {
          this.filteredCategoryGroup = this.categoryGroup.filter(item => item.empPersDtlId === parseInt(empRegId));
        }


        // if (empRegId ) {
        //   this.filteredCategoryGroup = this.categoryGroup.filter(item => item.empPersDtlId === parseInt(empRegId));
        // } else {
        //   this.filteredCategoryGroup = [];
        // }
        this.showOptions = this.filteredCategoryGroup.map(() => false);
        this.loading = false;
        this.observeLastCard();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  empRegId: any;
  //get user id 
  getEmpRegId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload['EmpRegId'] || null;
    }
    return null;
  }
  //#endregion
}