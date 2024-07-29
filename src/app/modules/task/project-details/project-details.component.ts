 
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { projectList } from 'src/app/shared/models/task';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../service/task.service';

interface User {
  id: number;
  name: string;
  designation: string;
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit{
  project!: projectList;
  dataSource!: MatTableDataSource<projectList>;
  projectId!: number;
  teamLeaderData: string[] = [];
  users: User[] = [];

  constructor(private route: ActivatedRoute , private taskService: TaskService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id']; 
      console.log('Project ID from route:', this.projectId);  // Debug log
      this.getProjectId(this.projectId);
    });
  }

  getProjectId(id: number): void {
    if (id) {
      this.taskService.getProjectById(id).subscribe(res => {
        console.log('API Response:', res);  // Debug log
        this.project = res;
        // Populate team leaders
        this.populateTeamLeaders(this.project.teamLeader);
      }, error => {
        console.error('API Error:', error);  // Debug log for errors
      });
    } else {
      console.error('Project ID is not defined');  // Debug log for undefined projectId
    }
  }

  
  populateTeamLeaders(teamLeaderString: string): void {
    this.teamLeaderData = teamLeaderString.split(',').map(leader => leader.trim());
  }
 //for popup 
 showTabs: boolean = false;
 toggleTabs() {
   this.showTabs = !this.showTabs;
 }
 showTask: boolean = false;
 toggleTask() {
   this.showTask = !this.showTask;
   this.imageUrl = null;
 }
 preventClose(event: MouseEvent) {
   event.stopPropagation();
}
/////////Upload Image/////////
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