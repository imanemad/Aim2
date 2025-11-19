"use client"

import toast from "react-hot-toast";
import FormHeader from "@/components/Form/FormHeader";
import Selection from "@/components/Form/Selection";
import SubmitBtn from "@/components/Form/SubmitBtn";
import InputText from "@/components/Form/InputText";
import InputPrice from "@/components/Form/InputNumber";
import { transactionsKeys } from "@/services/transactions/transactions.queryKeys";
import { Controller, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useGetCategoriesQuery } from "@/services/categories/hooks";
import { useGetBanksQuery } from "@/services/banks/hooks";
import { ICategory } from "@/services/categories/types";
import { IBank } from "@/services/banks/types";
import { TransactionFormValues} from "@/services/transactions/zod";
import { createTransactionAction } from "@/actions/transactions/create.action";
import { useQueryClient } from "@tanstack/react-query";
import { buildTransactionResolver } from "@/services/transactions/resolver";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const type = params.type?.toString() || "";
    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const { data: categories} = useGetCategoriesQuery(type);
    const { data: banks} = useGetBanksQuery();

    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [selectedBank, setSelectedBank] = useState<IBank | null>(null);

    const { register, handleSubmit, control, formState: { errors } } = useForm<TransactionFormValues>({
        resolver: buildTransactionResolver(
            selectedBank?.balance,          // موجودی بانک
            type as "deposit" | "withdraw"  // نوع تراکنش
        ),
        defaultValues: {
            amount: 0,
            description: "",
        },
    });
    
    const onSubmit = (data: TransactionFormValues) => {
        function normalizeType(value: string | undefined): "deposit" | "withdraw" | undefined {
            if (value === "deposit" || value === "withdraw") {
                return value;
            }
            return undefined; 
        }
        const rawType = params.type?.toString();
        const type = normalizeType(rawType);

        if (!selectedBank || !selectedCategory) {
            toast.error("لطفاً بانک و دسته‌بندی را انتخاب کنید");
            return;
        }

        startTransition(async () => {
                const result = await createTransactionAction({
                    ...data,
                    userId: 1,
                    bankId: selectedBank.id,
                    categoryId: selectedCategory.id,
                    type, // deposit | withdraw 
                    date: new Date().toISOString(),
                });

                if (result.success) {
                    toast.success(result.message!);
                    queryClient.invalidateQueries({ queryKey: transactionsKeys.list() });
                    router.push("/application");
                } else {
                    toast.error(result.message || "خطا در ذخیره اطلاعات");
                }
        });
    };


    const titles: Record<string, string> = {
        deposit: "واریز به حساب",
        withdraw: "برداشت از حساب",
    };
    const title = titles[type];

    return (
        <div className="Container">
            <FormHeader title={title}/>
            
            <form onSubmit={handleSubmit(onSubmit)} className="Form">
                <div className="Form-Item">
                    <Selection<IBank>
                        required
                        label="بانک / صندوق"
                        items={banks || []}
                        selectedItem={selectedBank}
                        getLabel={item => item.bankName}
                        onSelect={item => setSelectedBank(item)}
                        href="dashboard/new-bank"
                    />
                <div className="text-end p-0.5">
                    <div className="text-green-600">{selectedBank?.balance.toLocaleString()}</div>
                </div>
                </div>

                <div className="Form-Item">
                    <Selection<ICategory>
                        required
                        label="بابت"
                        items={categories || []}
                        selectedItem={selectedCategory}
                        getLabel={item => item.name}
                        onSelect={item => setSelectedCategory(item)}
                        href="new/new-category"
                    />
                </div>

                <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                        <InputPrice
                            label="مبلغ"
                            error={errors.amount?.message}
                            {...field}
                            onChange={(value) => field.onChange(value)} // ارسال مقدار عددی
                        />
                    )}
                />

                <InputText
                    label="توضیحات"
                    {...register("description")}
                    error={errors.description?.message}
                />

                <SubmitBtn isPending={isPending} title="ذخیره"/>
            </form>
        </div>
    )
}
