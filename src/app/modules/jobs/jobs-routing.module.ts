import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { AptitudeResultComponent } from './aptitude-result/aptitude-result.component';
import { ManageResumesComponent } from './manage-resumes/manage-resumes.component';
import { ShortlistCandidatesComponent } from './shortlist-candidates/shortlist-candidates.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { OfferApprovalsComponent } from './offer-approvals/offer-approvals.component';
import { ScheduleTimingComponent } from './schedule-timing/schedule-timing.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
    { path: 'JobDashboard', component: JobsDashboardComponent ,data: { title: 'Job/Dashboard' } },
    { path: 'Aptitude', component: AptitudeResultComponent ,data: { title: 'Job/Aptitude Result' } },
    { path: 'ManageResumes', component: ManageResumesComponent ,data: { title: 'Job/Manage Resumes' } },
    { path: 'ShortlistCandidates', component: ShortlistCandidatesComponent ,data: { title: 'Job/Shortlist Candidates' } },
    { path: 'CandidatesList', component: CandidatesListComponent ,data: { title: 'Job/Candidates List' } },
    { path: 'OfferApprovals', component: OfferApprovalsComponent ,data: { title: 'Job/Offer Approvals' } },
    { path: 'OfferApprovals', component: OfferApprovalsComponent ,data: { title: 'Job/Offer Approvals' } },
    { path: 'ScheduleTiming', component: ScheduleTimingComponent ,data: { title: 'Job/Offer Schedule Timing' } },
    { path: 'AllJobs', component: AllJobsComponent ,data: { title: 'Job/Offer All Jobs' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
