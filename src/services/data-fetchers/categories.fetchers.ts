import httpServices from "@/lib/httpServices";
import { ICategory } from "../categories/types";

export async function getCategories(type?: string): Promise<ICategory[]> {
    const res = await httpServices.get("/categories", {
        params: type ? { type } : {}
    });
    return res.data;
}

