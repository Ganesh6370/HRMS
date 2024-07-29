import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { MasterService } from '../service/master.service';
@Component({
  selector: 'app-master-sub-header',
  templateUrl: './master-sub-header.component.html',
  styleUrls: ['./master-sub-header.component.scss']
})
export class MasterSubHeaderComponent {
  showTabs = true;
  activeTab: string = '';

  // setActiveTab(tabName: string) {
  //   this.activeTab = tabName;
  // }

  constructor(private router: Router,private EmployeeServiceService: MasterService) { }
  menuItemsMaster = this.EmployeeServiceService.menuItemsMaster

  toggleTabs() {
    this.showTabs = !this.showTabs;
  }

  selectTab(event: any): void {
    const selectedRoute = event.target.value;
    this.router.navigateByUrl(selectedRoute);
  }
  // // constructor(private router: Router) { }


  goBack() {
    this.router.navigate(['/']); // Navigate back to the previous page
  }


  showShare = false;
  toggleShare() {
    this.showShare = !this.showShare;
}
selectedItemIndex: number = -1; // Initially no item is selected

selectItem(index: number) {
  this.selectedItemIndex = index;
  this.moveSelectedItemToFront(index);
  console.log(this.menuItemsMaster);
}

moveSelectedItemToFront(index: number) {
  if (index !== 0) {
    const selectedItem = this.menuItemsMaster.splice(index, 1)[0];
    this.menuItemsMaster.unshift(selectedItem);
    console.log("Updated menuItems:", this.menuItemsMaster); // Log the updated menuItems

    // No need to assign a new reference, the original array has been modified
 }
}
}