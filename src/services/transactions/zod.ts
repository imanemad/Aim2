import { z } from "zod";


export const transactionSchema = z.object({
    
    amount: z
        .number("مقدار باید عدد باشد")
        .min(0, { message: "مبلغ نمی‌تواند منفی باشد" }),

    description: z
        .string()
        .trim()
        .max(200, "توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"),
});


export type TransactionFormValues = z.infer<typeof transactionSchema>;




