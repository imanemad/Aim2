"use client";
import toast from "react-hot-toast";
import InputText from "@/components/Form/InputText";
import FormHeader from "@/components/Form/FormHeader";
import SubmitBtn from "@/components/Form/SubmitBtn";
import InputPrice from "@/components/Form/InputNumber";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { BankFormValues, bankSchema } from "@/services/banks/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createBankAction } from "@/actions/banks/create.action";
import { banksKeys } from "@/services/banks/banks.queryKeys";

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit,control, formState: { errors } } = useForm<BankFormValues>({
        resolver: zodResolver(bankSchema),
        defaultValues: {
            bankName: "",
            balance: 0,
        },
    });

    const onSubmit = (data: BankFormValues) => {
        startTransition(async () => {
            const result = await createBankAction({ ...data, userId: 1 });

            if (result.success) {
                toast.success(result.message!);

                queryClient.invalidateQueries({ queryKey: banksKeys.list() });

                router.back();
            } else {
                toast.error(result.message || "خطا در ذخیره اطلاعات");
            }
        });
    };

    return (
        <div className="Container">
        <FormHeader title="ایجاد صندوق"/>

        <form onSubmit={handleSubmit(onSubmit)} className="Form">
            <InputText
                required
                label="نام صندوق / بانک"
                {...register("bankName")}
                error={errors.bankName?.message}
            />

            <Controller
                name="balance"
                control={control}
                render={({ field }) => (
                <InputPrice
                    label="موجودی اولیه"
                    required
                    error={errors.balance?.message}
                    {...field}
                    onChange={(value) => field.onChange(value)} // ارسال مقدار عددی
                />
                )}
            />

            <SubmitBtn isPending={isPending} title="ذخیره"/>
        </form>
        </div>
    );
}
