// src/actions/contacts/update.action.ts
"use server";

import { updateContact } from "@/services/data-fetchers/contacts.fetchers";
import { actionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";

export interface UpdateContactState {
    success: boolean;
    message: string;
}

export async function updateContactAction(
    id: string,
    formData: { name: string; phone: string; userId: number }
): Promise<UpdateContactState> {
    try {
        await updateContact(id, formData);

        revalidatePath("/application/contacts");
        revalidatePath(`/application/contacts/${id}`);

        return actionResponse(true, "مخاطب با موفقیت ویرایش شد.");
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته هنگام ذخیره.";
        return actionResponse(false, message);
    }
}
