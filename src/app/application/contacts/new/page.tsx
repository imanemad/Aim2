"use client";
import toast from "react-hot-toast";
import InputText from "@/components/Form/InputText";
import SubmitBtn from "@/components/Form/SubmitBtn";
import FormHeader from "@/components/Form/FormHeader";
import { useRouter } from "next/navigation";
import { createContactAction } from "@/actions/contacts/create.action";
import { ContactFormValues, contactSchema } from "@/services/contacts/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { contactsKeys } from "@/services/contacts/contacts.queryKeys";

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            phone: "",
        },
    });

    const onSubmit = (data: ContactFormValues) => {
        startTransition(async () => {
            const result = await createContactAction({ ...data, userId: 1 });

            if (result.success) {
                toast.success(result.message!);

                queryClient.invalidateQueries({ queryKey: contactsKeys.list() });

                router.push("/application/contacts");
            } else {
                toast.error(result.message || "خطا در ذخیره اطلاعات");
            }
        });
    };

    return (
        <div className="Container">
            <FormHeader title="مخاطب جدید"/>

            <form onSubmit={handleSubmit(onSubmit)} className="Form">
                <InputText
                    label="نام مخاطب"
                    {...register("name")}
                    error={errors.name?.message}
                />

                <InputText
                    label="شماره تماس"
                    {...register("phone")}
                    error={errors.phone?.message}
                    className="En"
                />

                <SubmitBtn isPending={isPending} title="ذخیره"/>
            </form>
        </div>
    );
}
