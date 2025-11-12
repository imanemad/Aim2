"use server";

import { createBank } from "@/services/data-fetchers/banks.fetchers";
import { actionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";

export interface CreateBankState {
    success: boolean;
    message: string;
}

export async function createBankAction(formData: {
    bankName: string; balance: number; userId: number;
}): Promise<CreateBankState> {
    try {
        await createBank(formData);
        revalidatePath("/application/banks");
        return actionResponse(true, "صندوق جدید با موفقیت ایجاد شد.");
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته هنگام ذخیره.";
        return actionResponse(false, message);
    }
}
