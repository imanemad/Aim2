"use client";
import toast from "react-hot-toast";
import InputText from "@/components/Form/InputText";
import FormHeader from "@/components/Form/FormHeader";
import { useParams, useRouter } from "next/navigation";
import { showConfirmToast } from "@/components/Form/ConfirmToast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { BankFormValues, bankSchema } from "@/services/banks/zod";
import { createBank, deleteBank, getBank, updateBank } from "@/services/banks/endpoints";
import InputPrice from "@/components/Form/InputNumber";

export default function Page() {
  const { idOrNew } = useParams();
  const id = Array.isArray(idOrNew) ? idOrNew[0] : idOrNew;
  const isNew = id === "new-bank";
  const router = useRouter();

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<BankFormValues>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      bankName: "",
      balance: 0,
    },
  });

  // دریافت اطلاعات در حالت ویرایش
  useEffect(() => {
    if (isNew) return;
    const loadBank = async () => {
      try {
        const data = await getBank(id!);
        setValue("bankName", data.bankName);
        setValue("balance", data.balance);
      } catch {
        toast.error("خطا در دریافت اطلاعات");
      }
    };
    loadBank();
  }, [id, isNew, setValue]);

  const onSubmit = async (data: BankFormValues) => {
    try {
      if (isNew) {
        await createBank({ ...data, userId: 1 });
        toast.success("صندوق جدید ایجاد شد!");
      } else {
        await updateBank(id!, data);
        toast.success("صندوق ویرایش شد!");
      }
      router.push("/application/home");
    } catch {
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  const handleDelete = (id: string) => {
    showConfirmToast({
      message: "آیا مطمئن هستید از حذف این صندوق؟",
      onConfirm: async () => {
        await deleteBank(id);
        router.push("/application/home");
      },
    });
  };

  return (
    <div className="Container">
      <FormHeader
        isNew={isNew}
        onDelete={() => handleDelete(id!)}
        title={isNew ? "صندوق / بانک جدید" : "ویرایش صندوق"}
      />

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
          <button className="Btn Btn-Black m-0 mt-4" type="submit">
            {isNew ? "ذخیره" : "ویرایش"}
          </button>
        </div>
      </form>
    </div>
  );
}
