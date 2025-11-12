export interface ITransaction {
    id: number;
    userId: number;
    bankId: number;
    contactId?: number;
    categoryId: number;
    type: "deposit" | "withdraw";
    amount: number;
    description?:string;
    date: string;
}
