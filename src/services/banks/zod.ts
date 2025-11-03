import { z } from "zod";

export const bankSchema = z.object({
    bankName: z
        .string()
        .trim()
        .min(2, "نام باید حداقل ۲ کاراکتر باشد")
        .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

    balance: z
        .number("موجودی باید عدد باشد")
        .min(0, { message: "موجودی نمی‌تواند منفی باشد" }),
});

export type BankFormValues = z.infer<typeof bankSchema>;
