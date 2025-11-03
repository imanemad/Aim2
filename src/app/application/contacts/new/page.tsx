"use client";
import toast from "react-hot-toast";
import InputText from "@/components/Form/InputText";
import FormHeader from "@/components/Form/FormHeader";
import { useRouter } from "next/navigation";
import { createContact} from "@/services/contacts/endPoints";
import { ContactFormValues, contactSchema } from "@/services/contacts/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
        name: "",
        phone: "",
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await createContact({ ...data, userId: 1 });
            toast.success("مخاطب ایجاد شد!");
            router.push("/application/contacts");
        } catch {
            toast.error("خطا در ذخیره اطلاعات");
        }
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

                <div className="text-end Form-Item">
                    <button className="Btn Btn-Black m-0 mt-4" type="submit">ذخیره</button>
                </div>
            </form>
        </div>
    );
}
