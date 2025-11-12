"use server";

import { updateBank } from "@/services/data-fetchers/banks.fetchers";
import { actionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";

export interface UpdateBankState {
    success: boolean;
    message: string;
}

export async function updateBankAction(
    id: string,
    formData: { bankName: string; balance: number; userId: number }
): Promise<UpdateBankState> {
    try {
        await updateBank(id, formData);

        revalidatePath("/application/banks");
        revalidatePath(`/application/banks/${id}`);

        return actionResponse(true, "صندوق با موفقیت ویرایش شد.");
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته هنگام ذخیره.";
        return actionResponse(false, message);
    }
}
