import httpServices from "@/lib/httpServices";
import { IBank } from "../banks/types";

export async function getBanks(): Promise<IBank[]> {
    const res = await httpServices.get("/banks");
    return res.data;
}

export async function getBank(id: string): Promise<IBank> {
    const res = await httpServices.get(`/banks/${id}`);
    return res.data;
}

export async function createBank(contact: Partial<IBank>) {
    const res = await httpServices.post("/banks/", contact);
    return res.data;
}

export async function updateBank(id: string, bank: Partial<IBank>) {
    const res = await httpServices.put(`/banks/${id}`, bank);
    return res.data;
}

export async function deleteBank(id: string) {
    const res = await httpServices.delete(`/banks/${id}`);
    return res.data;
}
