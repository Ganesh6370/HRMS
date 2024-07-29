
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ConfigurationService } from "src/app/shared/service/http/configuration.service";
import { HttpService } from "src/app/shared/service/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  makePostReq(categoryGroupList: { createdBy: string; updatedBy: string; categoryGroupName: string; categoryGroupIcon: string; remarks: string; isActive: true; categoryGroupId: number; }) {
    throw new Error('Method not implemented.');
  }

  constructor(

    private httpService: HttpService,
    private configuration: ConfigurationService
  ) { }

  getEmpWithId(): Observable<any> {
    return this.httpService
      // .makeGetReq(this.configuration.getEmp, payLoad )
      //.makeGetReq(payLoad, this.configuration.getEmp)
      .makeGetReq(this.configuration.getEmp)
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
  getListEmployee(): Observable<any> {

    return this.httpService
      // .makeGetReq(this.configuration.getEmp, payLoad )

      .makeGetReq(this.configuration.getEmp)
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

  saveEmpPersonalDetail(empDetails: any): Observable<any> {
    return this.httpService
      // .makeGetReq(this.configuration.getEmp, payLoad )

      .makePostReq(empDetails, this.configuration.getEmp)
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
  //#region for get employee as per id
  getEmpById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.getEmp}/${id}`;
    return this.httpService
      .makeGetReq(apiUrl)
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
      )
  }
  //#endregion



  getAddressById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.getAddress}/${id}`;
    return this.httpService
      .makeGetReq(apiUrl)
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
      )
  }
  getContactById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.getContact}/${id}`;
    return this.httpService
      .makeGetReq(apiUrl)
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
      )
  }

  //#region  GET ALL DEPARTMENTS : GET : /api/Department : added by Vaibhav : 04/03/2024
  getAllDepartments(department: any): Observable<any> {
    return this.httpService
      .makeGetReq(department, this.configuration.getEmp)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
  }
  //#endregion
  //#region  GET ALL ROLES : GET : /api/Role : added by Vaibhav : 11/03/2024
  getAllRoles(role: any): Observable<any> {
    return this.httpService
      .makeGetReq(role, this.configuration.getEmp)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
  }
  //#endregion

  //#region  GET ALL WORK SHIFTS : GET : /api/WorkShift : added by Vaibhav : 14/03/2024
  getAllWorkShifts(workShift: any): Observable<any> {
    return this.httpService
      .makeGetReq(workShift, this.configuration.getEmp)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
  }
  //#endregion
  //#region GET ALL DESIGNATIONS : GET : /api/designation : added by Vaibhav : 05/03/2024
  getAllDesig(designation: any): Observable<any> {
    return this.httpService
      .makeGetReq(designation, this.configuration.getEmp)
      .pipe(map((res: any) => {
        return res
      }))
  }
  //#endregion

  //#region GET ALL OFFICE LOCATIONS : GET : /api/designation : added by Vaibhav : 05/03/2024
  getAllOffices(office: any): Observable<any> {
    return this.httpService
      .makeGetReq(office, this.configuration.getEmp)
      .pipe(map((res: any) => {
        return res
      }))
  }
  //#endregion
  //#region SUBMIT EMPLOYMENT FORM : GET : /api/Employment : added by Vaibhav : 15/03/2024
  saveAddEmployeeForm(formObj: any) {
    return this.httpService.makePostReqforEmploment(formObj, this.configuration.employment).pipe(map((res: any) => {
      return res
    }))
  }
  //#endregion

  //#region 
  saveEmpcontactDetail(contactDetails: any): Observable<any> {
    return this.httpService
      .makePostReq(contactDetails, this.configuration.getContact)
      .pipe(
        map((res: any) => { 
          return res;
        })
      );

  }
  //#endregion
  //#region 
  saveEmpAddressDetail(addressDetails: any): Observable<any> {
    return this.httpService
      .makePostReq(addressDetails, this.configuration.getAddress)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  //#endregion
  //#region Added by Satyam On 20 March 2024
  saveEmpIdentityDetail(identityDetails: any): Observable<any> {
    return this.httpService
      .makePostReq(identityDetails, this.configuration.getIdentity)
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }
  //#endregion

  //#region added by saubhagya On 21 March 2024
  getJobById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.getJob}/${id}`;
    // console.log(apiUrl);
    return this.httpService
      .makeGetReq(apiUrl)
      .pipe(
        map((res: any[]) => {
          //const responseBody = res.body;
          // if (res.status == "SUCCESS") {
          //   return res;
          // } else {
          //   return res.errorCode;
          // }

          return res;
        })
      )
  }

  getDepartmentById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.getDepartment}/${id}`;
    // console.log(apiUrl);
    return this.httpService
      .makeGetReq(apiUrl)
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
      )
  }
  getDesignationById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.getDesignation}/${id}`;
    // console.log(apiUrl);
    return this.httpService
      .makeGetReq(apiUrl)
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
      )
  }


  getIdentityById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.getIdentity}/${id}`;
    // console.log(apiUrl);
    return this.httpService
      .makeGetReq(apiUrl)
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
      )
  }


   
  //#endregion
  //#region {Family Component} (Satyam sagar 21/03/2024)
  saveEmpFamilyDetail(familyDetails: any): Observable<any> {
    return this.httpService
      .makePostReq(familyDetails, this.configuration.getFamily)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  //#endregion Satyam sagar 21/03/2024

  //#region {Employe login} (Saubhag 03/04/2024)
  createEmployeeLogin(formObj: any) {
    return this.httpService
      // .makeGetReq(this.configuration.getEmp, payLoad )
      .makePostReqUser(formObj, this.configuration.getUser)
      .pipe(
        map((res: any) => {
          const responseBody = res.body;
          if (res.status == "SUCCESS") {
            return res;
          } else {
            return res;
          }
          // return res;
        })
      );
  }
  //#endregion Saubhag 03/04/2024
  //#region Added by Satyam On 13 APR 2024
  saveEmpBankDetail(bankDetails: any): Observable<any> {
    return this.httpService
      .makePostReq(bankDetails, this.configuration.getEmpBankDetail)
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }
  //#endregion

  getFamilyById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.Family}/${id}`;
    return this.httpService
      .makeGetReq(apiUrl)
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
      )
  }


  getEmploymentById(id: number): Observable<any> {
    const apiUrl = `${this.configuration.Employment}/${id}`;
    return this.httpService
      .makeGetReq(apiUrl)
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
      )
  }

  //#region emp bank ( Amandeep 12 july 2024)
//bind bank name
getAllEployeeBank(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getBank)
    .pipe(
      map((res: any[]) => {
        return res.map(bank => ({
          name: bank.bankName, 
          value: bank.bankName
        }));
 })
);
}
  //#endregion

  //#region emp family (satyam sagar 19 April 2024)
  getAllEmpfamily(): Observable<any> {
    return this.httpService
      .makeGetReq(this.configuration.family)
      .pipe(
        map((res: any[]) => {
          return res.map(family => ({
            name: family.familyName,
            value: family.familyName
          }));
        })
      )
  }
  
  //#endregion

  //#region GET ALL WorkTypes : GET : /api/WorkType : added by Vaibhav : 19/04/2024
  getAllWorkType(designation: any): Observable<any> {
    return this.httpService
      .makeGetReq(designation, this.configuration.getWorkType)
      .pipe(map((res: any) => {
        return res
      }))
  }
  //#endregion

  //#region Emplotee Profile Added by saubhagy on 29 April 2024
  updateEmployeeDetail(formObj: any, id: any) {
    const apiUrl = `${this.configuration.getEmp}/${id}`;

    return this.httpService.makePutReq(formObj, apiUrl).pipe(map((res: any) => {
      return res
    }))
  }

  updateAddressDetail(formObj: any, id: any) {
    const apiUrl = `${this.configuration.getAddress}/${id}`;
    return this.httpService.makePutReq(formObj, apiUrl).pipe(map((res: any) => {
      return res
    }))
  }
  updatefamilyDetail(formObj: any, id: any) {
    const apiUrl = `${this.configuration.getFamily}/${id}`;
    return this.httpService.makePutReq(formObj, apiUrl).pipe(map((res: any) => {
      return res
    }))
  }

  updateidentityDetail(formObj: any, id: any) {
    const apiUrl = `${this.configuration.getIdentity}/${id}`;
    return this.httpService.makePutReq(formObj, apiUrl).pipe(map((res: any) => {
      return res
    }))
  }

  updatejobDetail(formObj: any, id: any) {
    const apiUrl = `${this.configuration.getJob}/${id}`;
    return this.httpService.makePutReq(formObj, apiUrl).pipe(map((res: any) => {
      return res
    }))
  }

  updateeducationDetail(formObj: any, id: any) {
    const apiUrl = `${this.configuration.getEducation}/${id}`;
    return this.httpService.makePutReq(formObj, apiUrl).pipe(map((res: any) => {
      return res
    }))
  }

  updateContactDetail(formObj: any, id: any) {
    const apiUrl = `${this.configuration.getContact}/${id}`;
    return this.httpService.makePutReq(formObj, apiUrl).pipe(map((res: any) => {
      return res
    }))
  }

  //#region SAVE NEW WORK EXPERIENCE : Added by Vaibhav on 03/05/2024
  saveWorkExpData(workExpDetails: any): Observable<any> {
    console.log('from service')
    console.log(workExpDetails)
    return this.httpService
      .makePostReq(workExpDetails, this.configuration.addEmpWorkExperience)
      .pipe(
        map((res: any) => {
          console.log('response from saveWorkExp')
          console.log(res)
          return res;
        })
      );

  }
  //#endregion

  //#region SAVE NEW LANGUAGE : Added by Vaibhav on 03/05/2024
  saveLanguageDetail(langDetails: any): Observable<any> {
    console.log('from service')
    console.log(langDetails)
    return this.httpService
      .makePostReq(langDetails, this.configuration.addLanguage)
      .pipe(
        map((res: any) => {
          console.log('response from saveLanguage')
          console.log(res)
          return res;
        })
      );

  }
  //#endregion

  //#region SAVE NEW CERTIFICATE : Added by Vaibhav on 03/05/2024
  saveCertDetails(certDetails: any): Observable<any> {
    console.log('from service')
    console.log(certDetails)
    return this.httpService
      .makePostReq(certDetails, this.configuration.addCertificate)
      .pipe(
        map((res: any) => {
          console.log('response from saveWorkExp')
          console.log(res)
          return res;
        })
      );

  }
  //#endregion
  //#region SAVE NEW EDUCATION   : Added by Vaibhav on 03/05/2024
  saveEducationDetails(educationDetails: any): Observable<any> {
    return this.httpService
      .makePostReq(educationDetails, this.configuration.addEducation)
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }
  //#endregion

  //#region SAVE Skill   : Added by satyam on 04/06/2024
  saveSkillDetails(skillDetails: any): Observable<any> {
    return this.httpService
      .makePostReq(skillDetails, this.configuration.getSkill)
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }

  //#endregion
 
 //#region emp skill (Amandeep Virdhi 10-07-2024) 
getEmpSkillList(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getSkill)
    .pipe(
      map((res: any[]) => {
        return res.map(skills => ({
          name: skills.skillName, 
          value: skills.skillName
        }));
      })
 );
 }
//#endregion
  //#endregion

  //#region  GET ALL SKILLS : GET : /api/Department : added by SATYAM : 04/06/2024
  getAllSkill(department: any): Observable<any> {
    return this.httpService
      .makeGetReq(department, this.configuration.getSkill)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
  }
  //#endregion

  //#region  GET ALL Country : added by GANESH SAHU : 26/06/2024
  getAllCountrys(country: any): Observable<any> {
    return this.httpService
      .makeGetReq(country, this.configuration.getCountry)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
  }
  //#endregion


  //#region  GET ALL State : added by GANESH SAHU : 25/06/2024
  getAllState(state: any): Observable<any> {
    return this.httpService
      .makeGetReq(state, this.configuration.getState)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
  }
  //#endregion

  //#region Added By Sapna for Supervisor on 27 June 2024
  getSupervisorsByDeptAndDesig(deptId: number, desigId: number): Observable<any> {
    const url = `${this.configuration.getSupervisor}/GetSupervisorName/${deptId}/${desigId}`;
    return this.httpService.makeGetReq(url).pipe(map((res: any) => res));
  }
  //#endregion
  //#region added By Sapna on 29 july 2024 for ligin mail send and save record for login
  createEmpLogin(data: any): Observable<any> {
    return this.httpService
      .makePostReqUser(data, this.configuration.getUser)
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }

  sendEmail(data: any): Observable<any> {
    return this.httpService
      .makePostReqSendMail(data, this.configuration.getOnBoardingLink)
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }
  //#endregion

  getempTypeOptions(): Observable<any[]> {
    return this.httpService
      .makeGetReq(this.configuration.getEmpType)
      .pipe(
        map((res: any[]) => {
          return res.map(empType => ({
            name: empType.empTypeName,
            value: empType.empTypeName
          }));
        })
      );
  }

  getEmployeeDetails(empRegId: string): Observable<any> {
    const url = `${this.configuration.getEmp}/${empRegId}`;
    return this.httpService.makeGetReq(url).pipe(map((res: any) => res));
  }

  //#region Added by sapna on 5 July 2024 for supervisor ddl bind
  getAllSupervisor(): Observable<any> {
    return this.httpService
      .makeGetReq(this.configuration.getSupervisor)
      .pipe(
        map((res: any[]) => {
          return res.map(supervisor => ({
            name: supervisor.superVisorName,
            value: supervisor.superVisorName
          }));
        })
      )
  }
  //#endregion
  //#region added by ganesg on 06 july 2024 for profile detils in employee detils get
  getEmploymentProfileById(empRegId: number): Observable<any> {
    const apiUrl =`${this.configuration.Employment}/${empRegId}`;
    console.log(apiUrl);
    return this.httpService
      .makeGetReq(apiUrl)
      .pipe(
        map((res: any) => {

          return res;
       })
 )
 }
  //#endregion

  //#region  dropdowns in employee dashboard added by Amandeep Virdhi : 03/07/2024
getProjectOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getProject)
    .pipe(
      map((res: any[]) => {
        return res.map(project => ({
          name: project.projectName, 
          value: project.projectId
        }));
      })
 );
 }
getDepartmentOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getDepartment)
    .pipe(
      map((res: any[]) => {
        return res.map(department => ({
          name: department.departmentName, 
          value: department.deptId
        }));
 })
);
}
//#endregion


//#region 

getManagerOptions(): Observable<any[]> {
  return this.httpService
    .makeGetReq(this.configuration.getManager)
    .pipe(
      map((res: any[]) => {
        return res.map(manager => ({
          name: manager.managerName, 
          value: manager.managerId
        }));
 })
 );
 }


//#endregion


//#region Added by amandeep on 10 july 2024 for eduction/ job/certifation/language 
getEducationById(empid: number): Observable<any> {
  const apiUrl = `${this.configuration.addEducation}/${empid}`;
  return this.httpService
  .makeGetReq(apiUrl)
  .pipe(
    map((res: any[]) => {
      //const responseBody = res.body;
      // if (res.status == "SUCCESS") {
      //   return res;
      // } else {
      //   return res.errorCode;
      // }
      return res;
    })
 )
 }
 
 getLanguageById(empid: number): Observable<any> {
  const apiUrl = `${this.configuration.addLanguage}/${empid}`;
  return this.httpService
  .makeGetReq(apiUrl)
  .pipe(
    map((res: any[]) => {
      return res;
    })
 )
 }
 getCertificateById(empid: number): Observable<any> {
  const apiUrl = `${this.configuration.addCertificate}/${empid}`;
  return this.httpService
  .makeGetReq(apiUrl)
  .pipe(
    map((res: any[]) => {
      return res;
    })
 )
} 
//#endregion


//#region  dropdowns in employee dashboard added by Amandeep Virdhi : 12/07/2024
getBankById(id: number): Observable<any> {
  const apiUrl = `${this.configuration.getEmpBankDetail}/${id}`;
  return this.httpService
    .makeGetReq(apiUrl)
    .pipe(
      map((res: any) => {
        return res;
 })
 )
}
//#endregion
}

