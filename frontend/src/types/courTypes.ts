export interface ICour {
    courName: string;
    prix: number;
    teacher: string;
    subject: string;
    grade: string,
}

export interface ICourResponse extends ICour {
    _id: string;
}

// Store

export interface ICourState {
    cours: ICourResponse[];
}

export interface ICourActions {
    addCour: (data: ICour) => Promise<void>;
    updateCour: (data: ICour, courId: string) => Promise<void>;
    deleteCour: (courId: string) => Promise<void>;
    getAllCours: () => Promise<void>;
}