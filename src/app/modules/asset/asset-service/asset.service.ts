import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ConfigurationService } from 'src/app/shared/service/http/configuration.service';
import { HttpService } from 'src/app/shared/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private httpService: HttpService,
    private configuration: ConfigurationService) { }

    getAssetsListWithId(): Observable<any> {
      return this.httpService
        .makeGetReq(this.configuration.getAssets)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }
    saveAssetListDetail(assetlistDetails: any): Observable<any> { 
      return this.httpService
        .makePostReq(assetlistDetails, this.configuration.getAssets)
        .pipe(
          map((res: any) => {
            return res;
          })
   );
 }

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

 getLocationOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.office)
    .pipe(
      map((res: any[]) => {
        return res.map(office => ({
          name: office.locality,
          value: office.officeId
        }));
      })
    );
}
getCategoryOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getAssetCategory)
    .pipe(
      map((res: any[]) => {
        return res.map(category => ({
          name: category.category, 
          value: category.category
        }));
      })
    );
}
getVendorOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getAssetVendor)
    .pipe(
      map((res: any[]) => {
        return res.map(vendor => ({
          name: vendor.name,
          value: vendor.vendorId
        }));
      })
    );
}
getEmployeeOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getEmp)
    .pipe(
      map((res: any[]) => {
        return res.map(employee => ({
          name: employee.fullName, 
          value: employee.fullName
        }));
      })
 );
 }
 getBrandOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getAssetBrand)
    .pipe(
      map((res: any[]) => {
        return res.map(Brand => ({
          name: Brand.brand,
          value: Brand.assetBrandId
        }));
      })
    );
}
editAssetsListDetail(assetlistDetails: any, id: string): Observable<any> {
  const x = this.configuration.getAssets + "/" + id;
  return this.httpService.makePutReq(assetlistDetails, x);
}
getListAssetVender(): Observable<any> {

  return this.httpService

    .makeGetReq(this.configuration.getVendor)
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

saveAssetVonderlDetail(empDetails: any): Observable<any> {
  return this.httpService
    // .makeGetReq(this.configuration.getEmp, payLoad )

    .makePostReq(empDetails, this.configuration.getVendor)
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



editAssetVenderDetails(assetVonderDetails: any, id: string): Observable<any> {
  const x = this.configuration.getVendor + "/" + id;
  return this.httpService.makePutReq(assetVonderDetails, x);
 }
}

