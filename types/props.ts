import {ValueType} from "AppTypes";
export interface iStudentMobileMenu{
    id:number;
    menuTitle:string;
    menuLink:string;
    menuIcon:string;
}
export interface iStudentMobileMenuList{
    menuItems:iStudentMobileMenu[]
}
export interface Ibookclassmodal{
    setBookOfClass:React.Dispatch<React.SetStateAction<ValueType>>;
    fetchBookApi :() => Promise<void>;
}

export interface IteacherNoteProps{
    teacherNote:string;
    setTeacherNote:React.Dispatch<React.SetStateAction<String>>;
    handelSubmitNote:() => void
}