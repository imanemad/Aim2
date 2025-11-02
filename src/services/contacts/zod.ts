import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "نام باید حداقل ۲ کاراکتر باشد")
        .max(50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"),

    phone: z
        .string()
        .trim()
        .regex(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شده و 11 رقم باشد"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
