"use client";
import toast from "react-hot-toast";
import InputText from "@/components/Form/InputText";
import FormHeader from "@/components/Form/FormHeader";
import InputPrice from "@/components/Form/InputNumber";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { BankFormValues, bankSchema } from "@/services/banks/zod";
import { useQueryClient } from "@tanstack/react-query";
import { banksKeys } from "@/services/banks/banks.queryKeys";
import { useGetBankQuery } from "@/services/banks/hooks";
import { updateBankAction } from "@/actions/banks/update.action";

export default function Page() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isPending, startTransition] = useTransition();

    const { data: bank, isError, error } = useGetBankQuery(id);

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<BankFormValues>({
        resolver: zodResolver(bankSchema),
        defaultValues: {
            bankName: "",
            balance: 0,
        },
    });

    useEffect(() => {
        if (bank) {
            setValue("bankName", bank.bankName);
            setValue("balance", bank.balance);
        }
    }, [bank, setValue]);

    if (isError) {
        toast.error(error.message);
        return <div className="ErrorState">خطا در بارگذاری اطلاعات صندوق.</div>;
    }

    const onSubmit = (formData: BankFormValues) => {
        startTransition(async () => {
            const result = await updateBankAction(id, { ...formData, userId: 1 });

            if (result.success) {
                toast.success(result.message!);

                queryClient.invalidateQueries({ queryKey: banksKeys.list() });
                queryClient.invalidateQueries({ queryKey: banksKeys.detail(id) });

                router.push("/application/dashboard");
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

                <div className="text-end Form-Item">
                    <button
                        className={`Btn Btn-Black m-0 mt-4 ${isPending ? "opacity-50" : ""}`}
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "در حال ذخیره..." : "ویرایش"}
                    </button>
                </div>
            </form>
        </div>
    );
}
