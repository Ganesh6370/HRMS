 

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Subscription, interval } from 'rxjs';
import { projectList } from '../../../shared/models/task'; 
import { TaskService } from '../service/task.service';
@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent {

  categoryGroup: Array<projectList> = [];
  filteredCardList: Array<projectList> = [];
  showOptions: boolean[] = [];
  defaultImage: string = '/assets/img/profile.png';
  numCardsToShow: number = 20;
  cardsToLoad: number = 20;
  loading: boolean = false; // Flag to indicate loading state
  autoLoadSubscription: Subscription | undefined; // Subscription for automatic data loading
  observer: IntersectionObserver | undefined; // Intersection observer instance

  constructor(private taskService:TaskService, private router: Router) { }

  ngOnInit() {
    this.getProjectList();

    // Initialize the Intersection Observer
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.loading) {
        this.loadMore();
      }
    }, { threshold: 0.5 });


    const lastCard = document.querySelector('.main5 .card:last-child');
    if (lastCard) {
      this.observer.observe(lastCard);
    }

    this.autoLoadSubscription = interval(100).subscribe(() => {

      const lastCardVisible = this.isLastCardVisible();
      if (lastCardVisible && !this.loading) {
        this.loadMore();
      }
      this.filteredCardList = this.filteredCardList.length == 0 ? this.categoryGroup.slice(0, this.numCardsToShow) : this.filteredCardList
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the interval to avoid memory leaks
    if (this.autoLoadSubscription) {
      this.autoLoadSubscription.unsubscribe();
    }
    // Disconnect the observer
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  getProjectList() {
    this.taskService.getListProject().subscribe(
      (res) => {
        this.categoryGroup = res;
        this.showOptions = res.map(() => false); // Initialize showOptions for each item
      },
      (error) => {
        console.error(error);
      }
    );
  }


  toggleOptions(index: number) {
    this.showOptions[index] = !this.showOptions[index];
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
      }, 2000);
    }
  }

  isLastCardVisible(): boolean {
    const lastCard = document.querySelector('.main5 .card:last-child');
    if (lastCard) {
      const rect = lastCard.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    }
    return false;
  }

  filterCards(e: Event) {
      this.filteredCardList = this.categoryGroup.slice(0, this.numCardsToShow)
      let nameInput = (e.target as HTMLInputElement);
      if(nameInput){
        if(nameInput.value !== ''){
      //    this.filteredCardList = this.categoryGroup.slice(0, this.numCardsToShow).filter((obj)=> obj.fullName.toLowerCase().includes(nameInput.value.toLowerCase()))
        }else{
          this.filteredCardList = this.categoryGroup.slice(0, this.numCardsToShow)
        }
      }
  }


  showTabs: boolean = false;
  toggleTabs() {
    this.showTabs = !this.showTabs;
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation();
 }
//#region  For open project Detils Page
 openProjectDetail(projectId: number): void {
  this.router.navigate(['/main/task/ProjectDet', projectId]);
}
//#endregion
}