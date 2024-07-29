import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConfigurationService } from 'src/app/shared/service/http/configuration.service';
import { HttpService } from 'src/app/shared/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private httpService: HttpService,
    private configuration: ConfigurationService
) { }

getHolidayOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getHolidayType)
    .pipe(
      map((res: any[]) => {
        return res.map(holiday => ({
          name: holiday.holidayTypeName,
          value: holiday.holidayTypeName
        }));
      })
    );
}

saveHolidayDetail(holidayDetails: any): Observable<any> { 
  return this.httpService
    .makePostReq(holidayDetails, this.configuration.getHoliday)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

getHolidayWithId(): Observable<any> {
  return this.httpService
    .makeGetReq(this.configuration.getHoliday)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

editHolidayDetail(holidayDetails: any, id: Number): Observable<any> {
  const x = this.configuration.getHoliday + "/" + id;
  return this.httpService.makePutReq(holidayDetails, x);
  }

}
