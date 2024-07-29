 


import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { projectList } from 'src/app/shared/models/task';
import { ConfigurationService } from 'src/app/shared/service/http/configuration.service';
import { HttpService } from 'src/app/shared/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private httpService: HttpService,
    private configuration: ConfigurationService
  ) { }

  getProjectById(id: number): Observable<projectList> {
    return this.httpService.makeGetReq(`${this.configuration.getProject}/${id}`)
    .pipe(
      map((res: any) => {
        return res;
     })
    );
    }
  getOfficeOptions(): Observable<any[]> {
    return this.httpService
      .makeGetReq(this.configuration.office)
      .pipe(
        map((res: any[]) => {
          return res.map(office => ({
            name: office.officeName,
            value: office.officeName
          }));
        })
      );
  }

  getEmpOptions(): Observable<any[]> {
    return this.httpService
      .makeGetReq(this.configuration.getEmp)
      .pipe(
        map((res: any[]) => {
          return res.map(emp => ({
            name: emp.fullName,
            value: emp.fullName
          }));
        })
  );

  

}
//#region added by aakash on 24 May 2024 for project dashboard
getListProject(): Observable<any> {

  return this.httpService
    // .makeGetReq(this.configuration.getEmp, payLoad )

    .makeGetReq(this.configuration.getProject)
    .pipe(
      map((res: any) => {
        //const responseBody = res.body;
        // if (res.status == "SUCCESS") {
        //   return res;
        // } else {
        //   return res.errorCode;
        // }
        return res;
      })
 ); 
}
//#endregion
//#region added by aakash on 24 May 2024 for project dashboard
saveProjectDetail(projectDetails: any): Observable<any> { 
  return this.httpService
    .makePostReq(projectDetails, this.configuration.getProject)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

getProjectWithId(): Observable<any> {
  return this.httpService
    .makeGetReq(this.configuration.getProject)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

editProjectDetail(projectDetails: any, id: Number): Observable<any> {
  const x = this.configuration.getProject + "/" + id;
  return this.httpService.makePutReq(projectDetails,x);
 }
}




 
