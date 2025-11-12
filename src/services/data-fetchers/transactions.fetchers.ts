import httpServices from "@/lib/httpServices";
import { ITransaction } from "../transactions/types";

export async function getTransactions(): Promise<ITransaction[]> {
    const res = await httpServices.get("/transactions");
    return res.data;
}

export async function getTransaction(id: string): Promise<ITransaction> {
    const res = await httpServices.get(`/transactions/${id}`);
    return res.data;
}