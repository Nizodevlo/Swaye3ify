export enum EPaiementStatus {
  pending = 'PENDING',
  completed = 'COMPLETED',
  failed = 'FAILED',
  refunded = 'REFUNDED',
}

export enum EPaiementMethod {
  creditCard = 'CREDITCARD',
  cash = 'CASH',
}

export interface IPaiment {
  amount: number;
  status: EPaiementStatus;
  method: EPaiementMethod;
  inscription: string;
}

export interface IPaimentResponse extends IPaiment {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

// --- New interfaces for Zustand Store ---

export interface IPaiementState {
  paiements: IPaimentResponse[];
}

export interface IPaiementActions {
  addPaiement: (data: IPaiment) => Promise<void>;
  updatePaiement: (data: IPaiment, paiementId: string) => Promise<void>;
  deletePaiement: (paiementId: string) => Promise<void>;
  getAllPaiements: () => Promise<void>;
}
