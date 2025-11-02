import httpServices from "@/lib/httpServices";
import { IPeople } from "./types";

export function getContacts(): Promise<IPeople[]> {
    return httpServices.get("/contacts").then(res => res.data);
}

