interface documentType {
  id: number | string;
  label: string;
  value: string;
}

export const documentOptions: documentType[] = [
  {
    id: "1",
    label: "Driving License",
    value: "Driving License",
  },
  {
    id: "2",
    label: "Passport",
    value: "Passport",
  },
  {
    id: "3",
    label: "Electricity Bill",
    value: "Electricity Bill",
  },
  { id: "4", value: "Teacher License Number", label: "Teacher License Number" },
];
