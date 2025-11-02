import httpServices from "@/lib/httpServices";

export async function getContacts() {
    const { data } = await httpServices.get("/contacts");
    return data;
}

