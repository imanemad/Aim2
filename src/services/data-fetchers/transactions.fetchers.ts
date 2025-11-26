import httpServices from "@/lib/httpServices";
import { ITransaction, ITransactionWithRelations } from "../transactions/types";

export async function getTransactions(): Promise<ITransactionWithRelations[]> {
    const res = await httpServices.get("/transactions");
    return res.data;
}

export async function getTransaction(id: string): Promise<ITransactionWithRelations> {
    const res = await httpServices.get(`/transactions/${id}`);
    return res.data;
}

export async function createTransaction(transaction: Partial<ITransaction>) {
    const res = await httpServices.post("/transactions/", transaction);
    return res.data;
}

export async function deleteTransaction(id: string) {
    const res = await httpServices.delete(`/transactions/${id}`);
    return res.data;
}
