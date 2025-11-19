"use server";

import { createTransaction } from "@/services/data-fetchers/transactions.fetchers";
import { actionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";
import { ITransaction } from "@/services/transactions/types"

export interface CreateTransactionState {
    success: boolean;
    message: string;
}

export async function createTransactionAction(
    formData: Partial<ITransaction>
): Promise<CreateTransactionState> {
    try {
        await createTransaction(formData);
        revalidatePath("/application/transactions");
        return actionResponse(true, "تراکنش جدید با موفقیت ایجاد شد.");
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته هنگام ذخیره.";
        return actionResponse(false, message);
    }
}
