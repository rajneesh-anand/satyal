export interface StateValue {
  label: string;
  value: string;
}

export interface ClassValue {
  label: string;
  value: string;
}

export interface MediumValue {
  label: string;
  value: string;
}

export const StreamOptions = [
  "None",
  "Science",
  "Arts",
  "Commerce",
  "Humanity",
];
export const SubjectsOptions = [
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
];

export const classOptions: ClassValue[] = [
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
  { value: "CLASS X", label: "CLASS X" },
  { value: "CLASS XI", label: "CLASS XI" },
  { value: "CLASS XII", label: "CLASS XII" },
];

export const statesOptions: StateValue[] = [
  { value: "Delhi", label: "Delhi" },
  { value: "Haryana", label: "Haryana" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Punjab", label: "Punjab" },
];

export const mediumOptions: MediumValue[] = [
  { value: "HINDI MEDIUM", label: "HINDI MEDIUM" },
  { value: "ENGLISH MEDIUM", label: "ENGLISH MEDIUM" },
];
