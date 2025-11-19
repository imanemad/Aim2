import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver } from "react-hook-form";
import { TransactionFormValues, transactionSchema } from "./zod";

export const buildTransactionResolver = (
    bankBalance?: number,
    type?: "deposit" | "withdraw"
): Resolver<TransactionFormValues> => {
    const baseResolver = zodResolver(transactionSchema);

    return async (values, context, options) => {
        const result = await baseResolver(values, context, options);

        if (type === "withdraw" && bankBalance !== undefined) {
            if (values.amount > bankBalance) {
                return {
                    values: {},
                    errors: {
                        amount: {
                            type: "manual",
                            message: "مبلغ برداشت نمی‌تواند بیشتر از موجودی باشد",
                        },
                    },
                };
            }
        }

        return result;
    };
};
