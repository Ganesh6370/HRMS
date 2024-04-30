import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ConfigurationService } from 'src/app/shared/service/http/configuration.service';
import { HttpService } from 'src/app/shared/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private httpService: HttpService, private configuration: ConfigurationService) { }

  // #region Brand***By Ganesh 16 April 2024 

  getBrandWithId(): Observable<any> {
    return this.httpService
      .makeGetReq(this.configuration.getAssetBrand)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getListBrand(): Observable<any> {
    return this.httpService
      .makeGetReq(this.configuration.getAssetBrand)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  saveBrandDetail(brandDetails: any): Observable<any> {
    debugger
    return this.httpService
      .makePostReq(brandDetails, this.configuration.getAssetBrand)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  editBrandDetail(brandDetails: any, id: string): Observable<any> {
    const x = this.configuration.getAssetBrand + "/" + id;
    return this.httpService.makePutReq(brandDetails, x);
  }

  //#endregion


    // #region Category***By Ganesh 16 April 2024 

    getCategoryWithId(): Observable<any> {
      return this.httpService
        .makeGetReq(this.configuration.getAssetCategory)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }
    getListCategory(): Observable<any> {
      return this.httpService
        .makeGetReq(this.configuration.getAssetCategory)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }
    saveCategoryDetail(categoryDetails: any): Observable<any> {
      debugger
      return this.httpService
        .makePostReq(categoryDetails, this.configuration.getAssetCategory)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }
    editCategoryDetail(categoryDetails: any, id: string): Observable<any> {
      const x = this.configuration.getAssetCategory + "/" + id;
      return this.httpService.makePutReq(categoryDetails, x);
    }
  
    //#endregion



}
