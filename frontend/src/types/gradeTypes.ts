export enum ECycle {
  PRIMAIRE = 'primaire',
  COLLEGE = 'college',
  LYCEE = 'lycee',
}

export interface IGrade {
    _id: string
    gradeName: string;
    cycle: ECycle;
}
