export interface IInscription {
    student: string;
    cour: string;
    dateInscription: Date;
}

export interface IInscriptionResponse extends IInscription {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

// Types for Inscription Store
export interface IInscriptionState {
    inscriptions: IInscriptionResponse[];
}

export interface IInscriptionActions {
    addInscription: (data: IInscription) => Promise<void>;
    updateInscription: (data: IInscription, inscriptionId: string) => Promise<void>;
    deleteInscription: (inscriptionId: string) => Promise<void>;
    getAllInscriptions: () => Promise<void>;
}