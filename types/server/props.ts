import { ValueType } from "AppTypes";

export interface IUserPersonalInfo{
    firstName: string;
    middleName?:string;
    lastName: string;
    parentName: string;
    parentContactNumber:string;
    email: string;
    password: string;
    studentClass?: string | ValueType;
    address: string;
    city: string;
    state?: string | ValueType;
    userContactNumber: string;
}

//type for online class individual details
export interface IOnlineClass{
    id:number;
    enrollCode:string;
    createdAt:string;
    meetingLink:string;
    onlineClassGrade:string;
    onlineClassName:string;
    onlineClassSection:string;
    teacherEmail:string;
    teacherName:string;
    notes?:[];
    studentDetails?:[];
    worksheets?:[]
}

// type for online class note
export interface IonlineClassNote{
    id:number;
    onlineClassId:number;
    content:string;
    createdAt:string;
}