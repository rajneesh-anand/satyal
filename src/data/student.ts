export interface ValueType {
  label: string;
  value: string;
}

export const classOptions: ValueType[] = [
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

export const subjectsOptions: ValueType[] = [
  { value: "Science", label: "Science" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "English", label: "English" },
  { value: "Physics", label: "Physics" },
];

export const statesOptions: ValueType[] = [
  { value: "Delhi", label: "Delhi" },
  { value: "Haryana", label: "Haryana" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Punjab", label: "Punjab" },
];

export const mediumOptions: ValueType[] = [
  { value: "HINDI MEDIUM", label: "HINDI MEDIUM" },
  { value: "ENGLISH MEDIUM", label: "ENGLISH MEDIUM" },
];
