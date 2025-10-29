export interface ITransaction {
    id: number;
    userId: number;
    bankId?: number;
    contactId?: number; // (اختیاری)
    title: string;
    type: "deposit" | "withdraw" | "debtor" | "creditor";
    amount: number;
    description?:string;
    date: string;
}
