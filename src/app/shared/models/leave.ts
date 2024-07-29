export interface holidayTypeList{
    holidayTypeId: 0,
    holidayTypeName: string,
    remarks: string,
    isActive: true,
    createdOn: Date,
    createdBy: string,
    updatedBy: string,
    updatedOn: Date
}

export interface holidayList{
    holidayId: 0,
    isActive: true,
    createdOn: Date,
    createdBy: string,
    updatedBy: string,
    updatedOn: Date,
    holiDayType: string,
    holidayName: string,
    fromDate:Date,
    toDate: Date,
    remarks:string
}