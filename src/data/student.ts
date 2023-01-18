interface StateValue {
  id: number | string;
  label: string;
  value: string;
}

interface StucentClass {
  id: number | string;
  label: string;
  value: string;
}

interface MediumValue {
  id: number | string;
  label: string;
  value: string;
}

export const StreamOptions = [
  'None',
  'Science',
  'Arts',
  'Commerce',
  'Humanity',
];
export const SubjectsOptions = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology',
];

export const classOptions: StucentClass[] = [
  {
    id: '1',
    label: 'CLASS VI',
    value: 'CLASS VI',
  },
  {
    id: '2',
    label: 'CLASS VII',
    value: 'CLASS VII',
  },
  {
    id: '3',
    label: 'CLASS VIII',
    value: 'CLASS VIII',
  },
  { id: '4', value: 'CLASS IX', label: 'CLASS IX' },
  { id: '5', value: 'CLASS X', label: 'CLASS X' },
  { id: '6', value: 'CLASS XI', label: 'CLASS XI' },
  { id: '7', value: 'CLASS XII', label: 'CLASS XII' },
];

export const statesOptions: StateValue[] = [
  { id: '1', value: 'Delhi', label: 'Delhi' },
  { id: '2', value: 'Haryana', label: 'Haryana' },
  { id: '3', value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { id: '4', value: 'Punjab', label: 'Punjab' },
];

export const mediumOptions: MediumValue[] = [
  { id: '1', value: 'HINDI MEDIUM', label: 'HINDI MEDIUM' },
  { id: '2', value: 'ENGLISH MEDIUM', label: 'ENGLISH MEDIUM' },
];
