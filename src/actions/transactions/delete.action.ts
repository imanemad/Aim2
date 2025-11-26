"use server";

import { getTransaction, deleteTransaction } from "@/services/data-fetchers/transactions.fetchers";
import { actionResponse } from "@/utils/serverActionResponse";
import { revalidatePath } from "next/cache";

export async function deleteTransactionAction(id: string) {
    try {
        const transaction = await getTransaction(id);

        if (!transaction) {
            return actionResponse(false, "تراکنش یافت نشد.");
        }

        await deleteTransaction(id);

        revalidatePath("/application/transactions");

        revalidatePath(`/application/banks`);
        revalidatePath(`/application/banks/${transaction.bankId}`);

        if (transaction.contactId) {
            revalidatePath(`/application/contacts`);
            revalidatePath(`/application/contacts/${transaction.contactId}`);
        }

        return actionResponse(true, "تراکنش با موفقیت حذف شد.");
    } catch (error) {
        const message = error instanceof Error ? error.message : "خطای ناشناخته.";
        return actionResponse(false, message);
    }
}
