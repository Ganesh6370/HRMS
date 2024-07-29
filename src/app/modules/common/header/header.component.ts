// import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core-module/auth-service/auth.service';
// import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from '../../employee/employee-service/employee-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  hideold: boolean = true;
  hidenew: boolean = true;
  hideconf: boolean = true;


  pageTitle: SafeHtml = "<></>";
  pageTitleArr: { text: string; link: string }[] = [];
  pageLinks: Map<string, string> = new Map([
    ['employee', 'employee/Empdashboard'],
    ['master', 'master/MasterHeader'],
    ['attendance', 'attendence/empatt'],
    ['leave', 'leave/apply'],
    ['asset', 'asset/category'],
  ]);
item: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
    private auth: AuthService,
    // private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer, private EmployeeServiceService: EmployeeServiceService) {
    this.validationForm = new FormGroup({
      oldpass: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      chanpass: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
      confpass: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),

    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        // Assuming you have defined 'title' in your route's data
        if (data['title']) {
          if (data['title'].includes('/')) {
            let pageTitleArr = data['title'].split('/')
            let linkKey = pageTitleArr[0].toLowerCase()
            console.log(linkKey)
            let linkRoute = this.pageLinks.get(linkKey)
            this.pageTitleArr = [
              {
                text: pageTitleArr[0],
                link: linkRoute || '/'
              },
              {
                text: pageTitleArr[1],
                link: ""
              }
            ]
            let tempTitleStr = `<a routerLink="../"> ${pageTitleArr[0]} </a> / ${pageTitleArr[1]}`
            this.pageTitle = this.sanitizer.bypassSecurityTrustHtml(tempTitleStr);
          } else {
            // this.pageTitle = data['title']
            this.pageTitleArr = []
          }
        } else {
          this.pageTitle = 'Home';
        }
      });
      this.empRegId = this.getEmpRegId();
      this.getEmployeeListById(this.empRegId);
  }
  // ngOnInit(): void { }
  // constructor(

  // ) { }
  logout() {
    this.auth.logout();
  }

  @Input() heading = 'Home'
  @Input() isLayoutLtr: boolean = true;
  @Input() isSettingsActive: boolean = false;
  @Output() toggleSettingsEvent = new EventEmitter<any>()
  isLowerNav = false;

  languages = [
    {
      name: 'English',
      flagClass: 'flag flag-united-states'
    },
    {
      name: 'Hindi',
      flagClass: 'flag flag-india'
    },
    {
      name: 'Arabic',
      flagClass: 'flag flag-saudi-arabia'
    },
    {
      name: 'Chinese',
      flagClass: 'flag flag-china'
    },
    {
      name: 'Japanese',
      flagClass: 'flag flag-japan'
    }
  ]

  alerts = [
    {
      data: 'This is an alert message for test.',
    },
    {
      data: 'This is an alert message for test.',
    },
    {
      data: 'This is an alert message for test.',
    },
    {
      data: 'This is an alert message for test.',
    },
    {
      data: 'This is an alert message for test.',
    },
    {
      data: 'This is an alert message for test.',
    },
  ]

  messages = [
    {
      by: '',
      msg: 'This is a message sent  to you.'
    },
    {
      by: '',
      msg: 'This is a message sent to you.'
    },
    {
      by: '',
      msg: 'This is a message sent  to you.'
    },
    {
      by: '',
      msg: 'This is a message sent  to you.'
    },
    {
      by: '',
      msg: 'This is a message sent to you.'
    },
    {
      by: '',
      msg: 'This is a message sent to you.'
    },
  ]

  isLangDropOpen = false
  isAlertDropOpen = false
  isMsgDropOpen = false
  isProfileDropOpen = false
  isQuickLinkDropOpen = false
  /////////////////
  onLangBtnClick() {
    this.isLangDropOpen = !this.isLangDropOpen;
    this.closeOtherDropdowns('lang');
  }

  onAlertBtnClick() {
    this.isAlertDropOpen = !this.isAlertDropOpen;
    this.closeOtherDropdowns('alert');
  }

  onMsgBtnClick() {
    this.isMsgDropOpen = !this.isMsgDropOpen;
    this.closeOtherDropdowns('msg');
  }
  onProfileBtnClick() {
    this.isProfileDropOpen = !this.isProfileDropOpen
    this.closeOtherDropdowns('profile');

  }

  onQuickLinkBtnClick() {
    this.isQuickLinkDropOpen = !this.isQuickLinkDropOpen
    this.closeOtherDropdowns('quickLink');

  }
  closeOtherDropdowns(openDropdown: string) {
    if (openDropdown !== 'lang') this.isLangDropOpen = false;
    if (openDropdown !== 'alert') this.isAlertDropOpen = false;
    if (openDropdown !== 'msg') this.isMsgDropOpen = false;
    if (openDropdown !== 'profile') this.isProfileDropOpen = false;
    if (openDropdown !== 'quickLink') this.isQuickLinkDropOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.btn-container') && !targetElement.closest('.quick-link-dropdown-container') && !targetElement.closest('.upper-navbar-right-profile-btn')) {
      this.isLangDropOpen = false;
      this.isAlertDropOpen = false;
      this.isMsgDropOpen = false;
      this.isProfileDropOpen = false;
      this.isQuickLinkDropOpen = false;
    }
  }
  /////////////

  toggleLowerNavbar() {
    this.isLowerNav = !this.isLowerNav
  }

  onSettingsClick() {
    this.isSettingsActive = !this.isSettingsActive
    this.toggleSettingsEvent.emit(this.isSettingsActive)
  }


  /////////Popup Code//////////

  validationForm!: FormGroup;
  password!: string;
  changePassword!: string;
  userEmail: string = '';

  get oldpass(): AbstractControl {
    return this.validationForm.get('oldpass')!;
  }
  get chanpass(): AbstractControl {
    return this.validationForm.get('chanpass')!;
  }
  get confpass(): AbstractControl {
    return this.validationForm.get('confpass')!;
  }

  onSubmit(): void {
    this.validationForm.markAllAsTouched();
    if (this.validationForm.valid) {
      const oldPassword = this.oldpass?.value;
      const newPassword = this.chanpass?.value;
      const confirmPassword = this.confpass?.value;

      if (newPassword !== confirmPassword) {
        this.toastr.error('New password and confirm password do not match');
        return;
      }

      const username = this.auth.getUsername() || '';

      this.auth.changepassword(username, oldPassword, newPassword).subscribe(
        result => {
          if (result.statusCode === 200) {
            this.toastr.success('Password changed successfully');
            this.router.navigate(['/main']);
          } else {
            this.toastr.error(result.message);
          }
        },
        error => {
          this.toastr.error(error.message);
        }
      );
    } else {
      this.toastr.error('Please fill in all required fields');
    }
  }

  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
    this.userEmail = '';
    this.validationForm.reset();
  }

  preventClose(event: MouseEvent) {
    event.stopPropagation();
 }

 //#region added by niraj on 06 july 2024 for redirect to profile page
 selectedEmpRegId: string ='';
//  redirectToProfile(empRegId: string) {
//    this.selectedEmpRegId = empRegId; 
//    console.log(this.selectedEmpRegId);
//    sessionStorage.setItem('empRegId',empRegId);
//    this.router.navigate(['../main/employee/profile'], { queryParams: { empid: empRegId } });
//  }
 //#endregion

 //#region added by Amandeep Virdhi on 18-07-2024 for get profile in header
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
 viewProfile(){
   const empRegId = this.getEmpRegId();
   if (empRegId) {
     this.router.navigate(['/main/employee/profile'], { queryParams: { empid: empRegId } });
     this.isProfileDropOpen = false; // Close the dropdown after navigating
   }
 }

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
 //#endregion
}