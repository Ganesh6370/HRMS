export interface Assets{
    assetId: number;
    category: string;
    serialNumber:string;
    model: string;
    status: string;
    warrantyEnd: string;
    assignemp: string;
    assignon: string;
    actions:string;
    isActive: true,
    createdOn: Date,
    createdBy: string,
    updatedBy: string,
    updatedOn: Date;
    brand: string,
    location: string,
    officeId: 0,
    acquired: string,
    warrantyStart: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string,
    remarks:string
  }

  //#region Added By Ganesh 27 April 2024
export interface assetbrandList {

  isActive: true,
  createdOn: Date,
  createdBy: string,
  updatedBy: string,
  updatedOn: Date,
  assetBrandId: 0,
  brand: string,
  officeId: 0,
  brandIcon: string,
  remarks: string
}
//#endregion

//#region Added By Ganesh 27 April  2024
export interface assetcategoryList {

  isActive: true,
  createdOn: Date,
  createdBy: string,
  updatedBy: string,
  updatedOn: Date,
  assetCategoryId: 0,
  category: string,
  officeId: 0,
  categoryIcon: string,
  remarks: string

}
//#endregion

//#region add for vendor by mohimula on 10 May 2024
export interface getAssetVonders{
    
  "vendorId":number,
  "name":string,
  "mobile":string,
  "alternateMobile":string,
  "emailId":string,
  "address":string,
  "state":string,
  "city":string,
  "zipcode":string,
  "gstin":string,
  "remarks":string,
  "vendorIds":string,
  "isActive":boolean,
  "createdOn":string,
  "createdBy":string,
  "updatedBy":string,
  "updatedOn":string,
}
export interface postAssetVonder {
  isActive: true;
  createdOn: Date;
  createdBy: string;
  updatedBy: string;
  updatedOn: Date;
  vendorId: number;
  name: string;
  mobile: string;
  alternateMobile: string;
  emailId: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
  gstin: string;
  remarks: string;
  }
//#endregion