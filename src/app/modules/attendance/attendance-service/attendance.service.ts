import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConfigurationService } from 'src/app/shared/service/http/configuration.service';
import { HttpService } from 'src/app/shared/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

   constructor(private httpService: HttpService, private configuration: ConfigurationService) { }

  ///////////////////////////Department/////////////////////////

  getManualAttendanceWithId(empRegId: string): Observable<any> {
    return this.httpService.makeGetReq(this.configuration.getManualAttendance).pipe(
      map((res: any) => {
        return res.filter((item: any) => item && item.empRegId.toString() === empRegId);
    })
 );
 }
  getListManualAttendance(): Observable<any> {
    return this.httpService
      .makeGetReq(this.configuration.getManualAttendance)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  saveManualAttendanceDetail(deptDetails: any): Observable<any> {
     
    return this.httpService
      .makePostReq(deptDetails, this.configuration.getManualAttendance)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  editManualAttendanceDetail(deptDetails: any, id: string): Observable<any> {
    const x = this.configuration.getManualAttendance + "/" + id;
    return this.httpService.makePutReq(deptDetails,x);
}
getEmployeeAttendanceWithId(empRegId: string): Observable<any> {
  const currentDate = new Date().toISOString().split('T')[0]; 
  return this.httpService.makeGetReq(this.configuration.getManualAttendance).pipe(
    map((res: any[]) => {
      return res.filter((item: any) => item && item.empRegId.toString() === empRegId && item.date.startsWith(currentDate));
    })
  );
}

getEmployeeAttendanceWithAttribute(empRegId: string): Observable<any> {
  const attribute = 0;
  const currentDate = new Date().toISOString().split('T')[0];
  const url = `${this.configuration.getManualAttendance}/${attribute}/${empRegId}/${currentDate}`;
  
  return this.httpService.makeGetReq(url).pipe(
    map((res: any) => {
      if (res && typeof res === 'object' && !Array.isArray(res)) {
        const loginDate = new Date(res.loginDate.replace(/-/g, '/'));
        const itemDate = new Date().toISOString().split('T')[0]; 
        if (res.empRegId.toString() === empRegId && currentDate === itemDate) {
          return res; // Return the response object
        }
      }
      return {};
    })
  );
}
getAttendanceDataForDay(empRegId: string,date: string): Observable<any> {
  const attribute = 0;
  const url = `${this.configuration.getManualAttendance}/${attribute}/${empRegId}/${date}`;

  return this.httpService.makeGetReq(url);
}


getEmployeeAttendanceForDate(empRegId: string, date: string): Observable<any> {
  const attribute = 0;
  return this.httpService.makeGetReq(`${this.configuration.getManualAttendance}/${attribute}/${empRegId}/${date}`);
}

getUserNameById(empRegId: string): Observable<any> {
  return this.httpService.makeGetReqForUserName(`${this.configuration.getUser}/userNameById?id=${empRegId}`);
}

//For attendanceList Popup
getAttendanceListWithId(empRegId: string,date: string): Observable<any> {
  return this.httpService.makeGetReq(this.configuration.getManualAttendance).pipe(
    map((res: any[]) => {
      return res.filter((item: any) => item && item.empRegId.toString() === empRegId && item.date.startsWith(date));
    })
  );
}

getAttendanceListWithAttribute(empRegId: string,date: string): Observable<any> {
  const attribute = 0;
  const url = `${this.configuration.getManualAttendance}/${attribute}/${empRegId}/${date}`;
  
  return this.httpService.makeGetReq(url).pipe(
    map((res: any) => {
      if (res && typeof res === 'object' && !Array.isArray(res)) {
        const loginDate = new Date(res.loginDate.replace(/-/g, '/'));
        loginDate.setDate(loginDate.getDate() + 1);
        console.log(loginDate.toISOString().split('T')[0]);
        console.log(date);
        if (res.empRegId.toString() === empRegId && loginDate.toISOString().split('T')[0] === date) {
          return res; // Return the response object
        }
      }
      return {};
 })
);
}


//#region added by sapna on 3 july 2024
getEmployeeAttendanceListWithId(empRegId: string): Observable<any> {
  const url = `${this.configuration.getManualAttendance}/GetAttandenceDetailById/${empRegId}`;
  return this.httpService.makeGetReq(url).pipe(
    map((res: any) => {
      return res.filter((item: any) => item && item.empRegId.toString() === empRegId);
    })
  );
}

getAttendanceSupervisorListWithId(empRegId: string): Observable<any> {
  const url = `${this.configuration.getManualAttendance}/GetApprovalRejectBySupervisoryId/${empRegId}`;
  return this.httpService.makeGetReq(url).pipe(
    map((res: any) => {
      console.log("res",res);
      console.log(res.filter((item: any) => item && item.empRegId.toString() === empRegId));
      return res.filter((item: any) => item && item.empRegId.toString() === empRegId);
  })
 );
 }
//#endregion


getAllEmployees(): Observable<any> {
  return this.httpService
    .makeGetReq(this.configuration.getEmp)
    .pipe(
      map((res: any) => {
        return res;
      })
 );
 }
}
