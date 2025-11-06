import httpServices from "@/lib/httpServices";
import { IPeople } from "../contacts/types";

export async function getContacts(): Promise<IPeople[]> {
    const res = await httpServices.get("/contacts");
    return res.data;
}

export async function getContact(id: string): Promise<IPeople> {
    const res = await httpServices.get(`/contacts/${id}`);
    return res.data;
}

export async function createContact(contact: Partial<IPeople>) {
    const res = await httpServices.post("/contacts/", contact);
    return res.data;
}

export async function updateContact(id: string, contact: Partial<IPeople>) {
    const res = await httpServices.put(`/contacts/${id}`, contact);
    return res.data;
}

export async function deleteContact(id: string) {
    const res = await httpServices.delete(`/contacts/${id}`);
    return res.data;
}

