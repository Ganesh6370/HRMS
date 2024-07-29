import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {
  getApiUrl() {
    throw new Error('Method not implemented.');
  }
  public ApiUrl = 'https://biller.koiv.in/api/'; 
  public ApiUrlLogin = 'https://ecomidentity.koiv.in/api/'; 

  public imgbaseURL = 'http://localhost:3000/service/assets/'; 
  public readonly getImgCatBrand = "categoryBrand/";


  public ApiUrlonboarding = 'https://apitest.koiv.in/api/'; 
  /** Authentication Url's **/
  public readonly getEmp = "EmpPersDtls";
  public readonly dept = "Department";
  public readonly getDepartmentDeleteMultiple = " Department/DeleteMultiple";
  public readonly getCountry = "Country";
  public readonly getContact = "Contact";
  public readonly getAddress ="Address";
  public readonly getDesig ="Designation"; 
  public readonly getRole = "Role";
  public readonly office = "Office"; 
  public readonly employment = "Employment";
  public readonly getEducation = "Education";
  public readonly getJobTitle = "JobTitle";
  public readonly getIdentity = "EmpIdentity";  
  public readonly  getDepartment ="Department";
  public readonly  getDesignation="Designation";
  public readonly getFamily = "EmpFamily";
  public readonly getUser = "User";
  public readonly getWorkType = "WorkType";
  public readonly getBank = "Bank";
  public readonly family = "Family";
  public readonly getEmpType = "EmpType";
  public readonly getState = "State";
  public readonly  Family ="EmpFamily";
  public readonly  Employment="Employment"; 
  public readonly getWorkShift = "WorkShift";
  public readonly  getJob ="EmpWorkExperience";
  public readonly getHolidayType = "HolidayType";
  public readonly addEmpWorkExperience = "EmpWorkExperience";
  public readonly addLanguage = "Language";
  public readonly addCertificate = "Certification";
  public readonly addEducation = "EmpEducation";
  public readonly getSkill = "Skill";
  public readonly getSupervisor = "Supervisor";
  public readonly getManager = "Manager";
 //*************Attendance************* */
  public readonly getManualAttendance = "ManualAttendance";
  public readonly getEmpBankDetail = "EmpBankAccount";
  //**********Asset*************** */
  public readonly getAssets = "Asset";
  public readonly getAssetBrand = "AssetBrand";
  public readonly getAssetCategory = "AssetCategory";
  public readonly getAssetVendor = "AssetVendor";
  public readonly getVendor = "AssetVendor"
  //***************Leave******************* */
  public readonly getHoliday = "Holiday";
  //Spublic readonly getHolidayType ="HolidayType";
  //*****************Task***************** */
  public readonly getProject = "Project";
//*********************Mail send for onboarding********************** */
  public readonly getOnBoardingLink = "OnBoardingLink";
}