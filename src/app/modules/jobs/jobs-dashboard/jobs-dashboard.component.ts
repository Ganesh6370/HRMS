 
import { Component, OnInit } from '@angular/core';

export interface UserData0 {
  Department: string;
  Time:string;
}

export interface UserData {
  id:number;
  JobTitle: string;
  Department: string;
  JobType: string;
  Actions:string;
}

export interface UserData1 {
  id:number;
  JobTitle: string;
  Department: string;
  StartDate:string;
  ExpireDate:string;
  JobType: string;
  Status:string;
  Actions:string;
}



@Component({
  selector: 'app-jobs-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.scss']
})
export class JobsDashboardComponent {

  displayedColumns0 = ['Department', 'Time'];

  data: UserData0[] = [
    { Department: "UI Developer", Time:"1 Hours ago"},
    { Department: "Android Developer",Time:"1 Days ago"},
    { Department: "IOS Developer", Time:"2 Days ago"},
    { Department: "PHP Developer", Time:"3 Days ago"},
    { Department: "UI Developer", Time:"3 Days ago"},
    { Department: "PHP Developer",Time:"4 Days ago"},
    { Department: "UI Developer", Time:"4 Days ago"},
    { Department: "Android Developer", Time:"6 Days ago"},
  ];

  displayedColumns = ['id', 'Job Title', 'Department', 'Job Type', 'Actions'];

  users: UserData[] = [
    { id: 1, JobTitle: "Web Developer", Department: "Development", JobType: "Full Time", Actions: "Download Offer" },
    { id: 2, JobTitle: "Web Designer ", Department: "Designing", JobType: "Part Time", Actions: "Download offer" },
    { id: 3, JobTitle: "Android Developer", Department: "Android", JobType: "Internship", Actions: "Download Offer" },
  ];

  displayedColumns1 = ['id', 'Job Title','Department','Start Date','Expire Date','Job Type','Status','Actions'];

  users1: UserData1[] = [
    { id: 1, JobTitle: "Web Developer", Department: "Development", StartDate:"3 Mar 2019",ExpireDate:"31 May 2019" ,JobType: "Full Time", Status:"Open",Actions: ":" },
    { id: 2, JobTitle: "Web Designer", Department: "Designing", StartDate:"3 Mar 2019",ExpireDate:"31 May 2019" ,JobType: "Part Time", Status:"Closed",Actions: ":" },
    { id: 3, JobTitle: "Android Developer", Department: "Android", StartDate:"3 Mar 2019",ExpireDate:"31 May 2019" ,JobType: "Internship", Status:"Cancelled",Actions: ":" },
    
  ];

  constructor() { }
  
  ngOnInit():void{}
}

