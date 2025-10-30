export interface ITransactionList {
    id: number;
    categoryId: number;
    type: "deposit" | "withdraw";
    amount: number;
    date: string;
}
