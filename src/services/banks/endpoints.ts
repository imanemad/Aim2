import httpServices from "@/lib/httpServices"
import { IBank } from "./bank"

export async function getBanks(): Promise<IBank[]> {
    const res = await httpServices.get("/banks");
    return res.data
}

export async function getBank(id: string): Promise<IBank> {
    const res = await httpServices.get(`/banks/${id}`);
    return res.data
}

export async function createBank(data: Partial<IBank>) {
    const res = await httpServices.post("/banks", data);
    return res.data
}

export async function updateBank(id: string, data: Partial<IBank>) {
    const res = await httpServices.put(`/banks/${id}`, data);
    return res.data
}

export async function deleteBank(id: string) {
    const res = await httpServices.delete(`/banks/${id}`);
    return res.data
}