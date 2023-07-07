export interface ValueType {
  label: string;
  value: string;
}

export const classOptions: ValueType[] = [
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
  { value: "Physics", label: "Physics" },
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
