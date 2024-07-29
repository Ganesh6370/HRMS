import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TaskBoardComponent } from './task-board/task-board.component';

const routes: Routes = [
  { path: 'Project', component: ProjectComponent ,data: { title: 'Task/Project' } },
  { path: 'ProjectDashboard', component: ProjectDashboardComponent ,data: { title: 'Task/Dashboard' } },
  { path: 'ProjectDet/:id', component: ProjectDetailsComponent ,data: { title: 'Task/Project Detils' } },
  { path: 'TaskBoard', component: TaskBoardComponent ,data: { title: 'Task/Task Board' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
