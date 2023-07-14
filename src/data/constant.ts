import {ClassSubject} from "AppTypes"
export interface ValueType {
  label: string;
  value: string;
}

export const classOptions: ValueType[] = [
  {
    label: "CLASS Nursery",
    value: "CLASS Nursery"
  },
  {
    label: "CLASS LKG",
    value: "CLASS LKG",
  },
  {
    label: "CLASS UKG",
    value: "CLASS UKG",
  },
  {
    label: "CLASS I",
    value: "CLASS I",
  },
  {
    label: "CLASS II",
    value: "CLASS II",
  },
  {
    label: "CLASS III",
    value: "CLASS III",
  },
  {
    label: "CLASS IV",
    value: "CLASS IV",
  },
  {
    label: "CLASS V",
    value: "CLASS V",
  },

  {
    label: "CLASS VI",
    value: "CLASS VI",
  },
  {
    label: "CLASS VII",
    value: "CLASS VII",
  },
  {
    label: "CLASS VIII",
    value: "CLASS VIII",
  },
  { value: "CLASS IX", label: "CLASS IX" },
  { value: "CLASS X", label: "CLASS X" }
];

export const subjectsOptions: ValueType[] = [
  { value: "Science", label: "Science" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "English", label: "English" },
  { value: "Nepali", label: "Nepali" },
  { value: "Social", label: "Social" },
  { value: "Economics", label: "Economics" },
  { value: "Accounting", label: "Accounting" },
  { value: "GK", label: "GK" },
  { value: "Moral", label: "Moral" },
];
export const subject_inClass:ClassSubject[]=[
  {
    student_class:"CLASS Nursery",
    value: "grade-nursery",
    label: "CLASS Nursery",
    subject:[
      { value: "English Volume 1", label: "English Volume 1" },
      { value: "English Volume 2", label: "English Volume 2" },
      { value: "English Volume 3", label: "English Volume 3" },
      { value: "Mathematics Volume 1", label: "Mathematics Volume 1" },
      { value: "Mathematics Volume 2", label: "Mathematics Volume 2" },
      { value: "Mathematics Volume 3", label: "Mathematics Volume 3" },
      { value: "Nepali Volume 1", label: "Nepali Volume 1" },
      { value: "Nepali Volume 2", label: "Nepali Volume 2" },
      { value: "Nepali Volume 3", label: "Nepali Volume 3" }
    ]
  },
  {
    student_class:"CLASS LKG",
    value: "grade-lkg",
    label: "CLASS LKG",
    subject:[
      { value: "English Volume 1", label: "English Volume 1" },
      { value: "English Volume 2", label: "English Volume 2" },
      { value: "English Volume 3", label: "English Volume 3" },
      { value: "Mathematics Volume 1", label: "Mathematics Volume 1" },
      { value: "Mathematics Volume 2", label: "Mathematics Volume 2" },
      { value: "Mathematics Volume 3", label: "Mathematics Volume 3" },
      { value: "Nepali Volume 1", label: "Nepali Volume 1" },
      { value: "Nepali Volume 2", label: "Nepali Volume 2" },
      { value: "Nepali Volume 3", label: "Nepali Volume 3" },
      { value: "Science Volume 1", label: "Science Volume 1" },
      { value: "Science Volume 2", label: "Science Volume 2" },
      { value: "Science Volume 3", label: "Science Volume 3" }
    ]
  },
  {
    student_class:"CLASS UKG",
    value: "grade-ukg",
    label: "CLASS UKG",
    subject:[
      { value: "English Volume 1", label: "English Volume 1" },
      { value: "English Volume 2", label: "English Volume 2" },
      { value: "English Volume 3", label: "English Volume 3" },
      { value: "Mathematics Volume 1", label: "Mathematics Volume 1" },
      { value: "Mathematics Volume 2", label: "Mathematics Volume 2" },
      { value: "Mathematics Volume 3", label: "Mathematics Volume 3" },
      { value: "Nepali Volume 1", label: "Nepali Volume 1" },
      { value: "Nepali Volume 2", label: "Nepali Volume 2" },
      { value: "Nepali Volume 3", label: "Nepali Volume 3" },
      { value: "Science Volume 1", label: "Science Volume 1" },
      { value: "Science Volume 2", label: "Science Volume 2" },
      { value: "Science Volume 3", label: "Science Volume 3" }
    ]
  },
  {
    student_class:"CLASS I",
    value: "grade-1",
    label: "CLASS I",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Elegance in English", label: "Elegance in English" },
      { value: "Syntax Grammar", label: "Syntax Grammar" },
      { value: "Nepali Sahitya", label: "Nepali Sahitya" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "Moral", label: "Moral" },
      { value: "General Knowledge", label: "General Knowledge" },
      
    ]
  },
  {
    student_class:"grade-2",
    value: "grade-2",
    label: "CLASS II",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Elegance in English", label: "Elegance in English" },
      { value: "Syntax Grammar", label: "Syntax Grammar" },
      { value: "Nepali Sahitya", label: "Nepali Sahitya" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "Moral", label: "Moral" },
      { value: "General Knowledge", label: "General Knowledge" },
      
    ]
  },
  {
    student_class:"CLASS III",
    value: "grade-3",
    label: "CLASS III",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Elegance in English", label: "Elegance in English" },
      { value: "Syntax Grammar", label: "Syntax Grammar" },
      { value: "Nepali Sahitya", label: "Nepali Sahitya" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "Moral", label: "Moral" },
      { value: "General Knowledge", label: "General Knowledge" },
      
    ]
  },
  {
    student_class:"CLASS IV",
    label: "CLASS IV",
    value: "grade-4",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Elegance in English", label: "Elegance in English" },
      { value: "Syntax Grammar", label: "Syntax Grammar" },
      { value: "Nepali Sahitya", label: "Nepali Sahitya" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "Moral", label: "Moral" },
      { value: "General Knowledge", label: "General Knowledge" },
      
    ]
  },
  {
    student_class:"CLASS V",
    label: "CLASS V",
    value: "grade-5",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Elegance in English", label: "Elegance in English" },
      { value: "Syntax Grammar", label: "Syntax Grammar" },
      { value: "Nepali Sahitya", label: "Nepali Sahitya" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "Moral", label: "Moral" },
      { value: "General Knowledge", label: "General Knowledge" },
      
    ]
  },
  {
    student_class:"CLASS VI",
    label: "CLASS VI",
    value: "grade-6",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Elegance in English", label: "Elegance in English" },
      { value: "Syntax Grammar", label: "Syntax Grammar" },
      { value: "Nepali Sahitya", label: "Nepali Sahitya" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "General Knowledge", label: "General Knowledge" },
      
    ]
  },
  {
    student_class:"CLASS VII",
    label: "CLASS VII",
    value: "grade-7",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Elegance in English", label: "Elegance in English" },
      { value: "Syntax Grammar", label: "Syntax Grammar" },
      { value: "Nepali Sahitya", label: "Nepali Sahitya" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "General Knowledge", label: "General Knowledge" },
      
    ]
  },
  {
    student_class:"CLASS VIII",
    label: "CLASS VIII",
    value: "grade-8",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Syntax Grammar", label: "Syntax Grammar" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "Multi-Resource Comprehension Passage Volume 1", label: "Multi-Resource Comprehension Passage Volume 1" },
      { value: "Multi-Resource Comprehension Passage Volume 2", label: "Multi-Resource Comprehension Passage Volume 2" },
      { value: "Multi-Resource Comprehension Passage Volume 3", label: "Multi-Resource Comprehension Passage Volume 3" },
      
    ]
  },
  {
    student_class:"CLASS IX",
    label: "CLASS XI",
    value: "grade-9",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Basic English Grammar", label: "Basic English Grammar" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "Multi-Resource Comprehension Passage Volume 1", label: "Multi-Resource Comprehension Passage Volume 1" },
      { value: "Multi-Resource Comprehension Passage Volume 2", label: "Multi-Resource Comprehension Passage Volume 2" },
      { value: "Multi-Resource Comprehension Passage Volume 3", label: "Multi-Resource Comprehension Passage Volume 3" },
      
    ]
  },
  {
    student_class:"CLASS X",
    label: "CLASS X",
    value: "grade-10",
    subject:[
      { value: "Elementary Mathematics", label: "Elementary Mathematics" },
      { value: "Learning Science", label: "Learning Science" },
      { value: "Basic English Grammar", label: "Basic English Grammar" },
      { value: "Nepali Byakaran", label: "Nepali Byakaran" },
      { value: "Multi-Resource Comprehension Passage Volume 1", label: "Multi-Resource Comprehension Passage Volume 1" },
      { value: "Multi-Resource Comprehension Passage Volume 2", label: "Multi-Resource Comprehension Passage Volume 2" },
      { value: "Multi-Resource Comprehension Passage Volume 3", label: "Multi-Resource Comprehension Passage Volume 3" },
      
    ]
  }
];
export const statesOptions: ValueType[] = [
  { value: "State 3 [ Bagmati Province ]", label: "State 3 [ Bagmati Province ]" },
  { value: "State 1 [ Koshi Province ]", label: "State 1 [ Koshi Province ]" },
  { value: "State 2 [ Madesh Province ]", label: "State 2 [ Madesh Province ]" },
  { value: "State 4 [ Gandaki  Province ]", label: "State 4 [ Gandaki  Province ]" },
  { value: "State 5 [ Lumbini  Province ]", label: "State 5 [ Lumbini  Province ]" },
  { value: "State 6 [ Karnali  Province ]", label: "State 6 [ Karnali  Province ]" },
  { value: "State 7 [ Sudur Pashchim Province ]", label: "State 7 [ Sudur Pashchim Province ]" },
];


export const documentOptions: ValueType[] = [
  {
    label: "Driving License",
    value: "Driving License",
  },
  {
    label: "Passport",
    value: "Passport",
  },
  {
    label: "Electricity Bill",
    value: "Electricity Bill",
  },
  { value: "Teacher License Number", label: "Teacher License Number" },
];

export const ACCEPTED_FILE_TYPES =
  "image/*,application/pdf,application/zip,application/vnd.rar,application/epub+zip,.psd";
  
 