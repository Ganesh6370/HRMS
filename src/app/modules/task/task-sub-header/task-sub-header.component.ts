import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-sub-header',
  templateUrl: './task-sub-header.component.html',
  styleUrls: ['./task-sub-header.component.scss']
})
export class TaskSubHeaderComponent {

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
