 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
 

const routes: Routes = [{
  path: '',
  component: MainDashboardComponent,
  children: [
    //{ path: '', redirectTo: '', pathMatch: "full" }, // for refresh url geting error 404
    { path: 'dashboard', component: DashboardComponent,data: { title: 'Dashboard' } },
    { path: '', redirectTo: '/main/dashboard', pathMatch: 'full',data: { title: 'Dashboard' }},
//#region Employee 
    {
      path: 'employee',
      loadChildren: () => import('./employee/employee.module').then((E) => E.EmployeeModule),
 },
 //#endregion

  //#region  Master
  {path:'master',
  loadChildren:()=>import('./master/master.module').then((m)=>m.MasterModule),
},
//#endregion

//Asset************************* */
{
  path:'asset',
  loadChildren:()=>import('./asset/asset.module').then((a)=>a.AssetModule),
},
// //Leave************************* */
{
path:'leave',
loadChildren:()=>import('./leave/leave.module').then((l)=>l.LeaveModule)
},
// //Attendance************************* */
{
path:'attendence',
loadChildren:()=>import('./attendance/attendance.module').then((a)=>a.AttendanceModule)
},

// //Jobs************************* */
{
  path:'jobs',
  loadChildren:()=>import('./jobs/jobs.module').then((a)=>a.JobsModule)
  },
//*********************task */
{
  path:'task',
  loadChildren:()=>import('./task/task.module').then((a)=>a.TaskModule)
  }
  ],
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
