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
    id: number;
    type: "deposit" | "withdraw";
    categoryName: string;
    bankName: string;
    lastBalanceBank: number;
    contactName: string | null;
    amount: number;
    description?: string;
    date: string;
}
