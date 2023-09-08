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