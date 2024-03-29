declare module "AppTypes" {
  export interface UserServiceConfiguration {
    studentInfo?: StudentInfo;
    selectedPlan?: Plan | null;
    teacherInfo?: TeacherInfo;
    teacherKYCInfo?: TeacherKYCInfo;
  }
  export interface ValueType {
    label: string;
    value: string;
  }

  export interface StudentInfo {
    firstName: string;
    middleName?: string;
    lastName: string;
    parentName: string;
    parentContactNumber: string;
    email: string;
    password: string;
    studentClass?: string | ValueType;
    address: string;
    city: string;
    state?: string | ValueType;
    userContactNumber: string;
  }

  export interface TeacherInfo {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state?: string | ValueType;
    userContactNumber: string;
    schoolName: string;
    schoolContact: string;
    schoolAddress: string;
    schoolCity: string;
    schoolState: string | ValueType;
  }

  export interface TeacherKYCInfo {
    bank_branch: string;
    accountHolder_name: string;
    account_number: string;
    bank: string;
    subjects: any;
    citizen_image_first: File | null;
    citizen_image_last?: File | null;
    school_identity_card?: File | null;
    degree_bachelor?: File | null;
    degree_master?: File | null;
  }

  export interface Plan {
    id: number;
    plan_name: string;
    plan_description: string;
    plan_fee: number;
    plan_discounted_fee: number;
    with_out_vat: string;
    most_popular: boolean;
    features: string[];
  }
  export interface ClassSubject {
    student_class: string;
    value: string;
    label: string;

    subject: ValueType[];
  }
}
