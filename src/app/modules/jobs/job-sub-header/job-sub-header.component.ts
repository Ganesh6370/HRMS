import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-sub-header',
  templateUrl: './job-sub-header.component.html',
  styleUrls: ['./job-sub-header.component.scss']
})
export class JobSubHeaderComponent {

  showTabs = true;
  activeTab: string = ''; 
  constructor(private router: Router) { }

  toggleTabs() {
    this.showTabs = !this.showTabs;
  }

  selectTab(event: any): void {
    const selectedRoute = event.target.value;
    this.router.navigateByUrl(selectedRoute);
  } 

  goBack() {
    this.router.navigate(['/']); // Navigate back to the previous page
  } 

  showShare = false;
  toggleShare() {
    this.showShare = !this.showShare;
  }
}
