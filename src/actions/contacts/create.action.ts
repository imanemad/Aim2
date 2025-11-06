"use server";

import { createContact } from "@/services/data-fetchers/contacts.fetchers";
import { actionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";

export interface CreateContactState {
    success: boolean;
    message: string;
}

export async function createContactAction(formData: {
    name: string;
    phone: string;
    userId: number;
}): Promise<CreateContactState> {
    try {
        await createContact(formData);
        revalidatePath("/application/contacts");
        return actionResponse(true, "مخاطب با موفقیت ایجاد شد.");
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته هنگام ذخیره.";
        return actionResponse(false, message);
    }
}
