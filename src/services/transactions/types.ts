export interface ITransaction {
    id: number;
    userId: number;
    bankId: number;
    contactId?: number;
    categoryId: number;
    type: "deposit" | "withdraw";
    lastBalanceBank : number;
    amount: number;
    description?:string;
    date: string;
}

export interface ITransactionWithRelations {
    id: string;
    type: "deposit" | "withdraw";
    categoryName: string;
    bankName: string;
    bankId: string;
    lastBalanceBank: number;
    contactName: string | null;
    contactId: string | null;
    amount: number;
    description?: string;
    date: string;
}
