"use server"; 

import { deleteBank } from "@/services/data-fetchers/banks.fetchers";
import { actionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";

export async function deleteBankAction(id: string) {
    try {
        await deleteBank(id);
        revalidatePath("/application/banks");
        return actionResponse(true, "صندوق با موفقیت حذف شد.");
    } catch (error) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته.";
        return actionResponse(false, message);
    }
}