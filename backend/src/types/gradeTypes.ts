export enum ECycle {
  PRIMAIRE = 'primaire',
  COLLEGE = 'college',
  LYCEE = 'lycee',
}

export interface IGrade {
  gradeName: string;
  cycle: ECycle;
}
