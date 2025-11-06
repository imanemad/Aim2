"use server"; 

import { deleteContact } from "@/services/data-fetchers/contacts.fetchers";
import { actionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";

export async function deleteContactAction(id: string) {
    try {
        await deleteContact(id);
        revalidatePath("/application/contacts");
        revalidatePath(`/application/contacts/${id}`);
        return actionResponse(true, "مخاطب با موفقیت حذف شد.");
    } catch (error) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته.";
        return actionResponse(false, message);
    }
}