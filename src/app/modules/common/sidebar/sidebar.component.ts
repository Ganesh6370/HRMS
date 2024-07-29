import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from '../../employee/employee-service/employee-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() childEvent = new EventEmitter<any>();
  @Input() isSidebarActive: boolean = false;
  @Input() isLayoutLtr: boolean = true;
  activeItem: any = null;
  constructor(private EmployeeServiceService: EmployeeServiceService, private route: ActivatedRoute,){}
  ngOnInit() {
    // this.isLayoutLtr = true;
    this.empRegId = this.getEmpRegId();
    this.getEmployeeListById(this.empRegId);
    this.getEmpProfileListById(this.empRegId);
 }
  sendDataToParent() {
    this.childEvent.emit(this.isSidebarActive);
  }
  inactiveSidebarClick() {
    this.isSidebarActive = true;
    this.sendDataToParent()
  }
  activeSidebarClick() {
    this.isSidebarActive = false;
    this.sendDataToParent()
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    this.sendDataToParent();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.isSidebarActive) {
      this.toggleSidebar();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isSidebarActive) {
      this.toggleSidebar();
    }
  }
  
  //#region added by Amandeep Virdhi on 12-07-2024
  empRegId: any;
  
//get user id 
   getEmpRegId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload['EmpRegId']||null;
    }
    return null;
  }
//name from EmpPersDtls api using personal
  personal: any;
  getEmployeeListById(empRegId: any) {
    this.EmployeeServiceService.getEmpById(empRegId).subscribe(
      (res) => {
        this.personal = res;
      },
      (error) => {
        console.error(error);
      }
    )
  }
  //department from Employement api using employement
  employment: any;
  getEmpProfileListById(empRegId: any) {
    this.EmployeeServiceService.getEmploymentProfileById(empRegId).subscribe(
      (res) => {
        this.employment = res;
      },
      (error) => {
        console.error(error);
      }
    )
  }
 //#endregion
}


