export interface ISalle {
  salleName: string;
  capacity: number;
}

export interface ISalleResponse extends ISalle {
  _id: string;
}

export interface ISalleState {
  salles: ISalleResponse[];
}

export interface ISalleAction {
  addSalle: (data: ISalle) => Promise<void>;
  updateSalle: (data: ISalle, salleId: string) => Promise<void>;
  deleteSalle: (salleId: string) => Promise<void>;
  getAllSalle: () => Promise<void>;
}
